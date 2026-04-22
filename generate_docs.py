from __future__ import annotations

import html
import json
import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "self-internship-site"
DOCS = SITE / "docs"

EXCLUDED_DIRS = {
    ".git",
    "__pycache__",
    ".pytest_cache",
    "docs",
}

READABLE_EXTENSIONS = {
    ".md",
    ".py",
    ".sh",
    ".sql",
    ".ino",
    ".java",
    ".txt",
    ".yml",
    ".yaml",
    ".json",
}

SPECIAL_FILENAMES = {"Dockerfile", "requirements.txt"}


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def output_for(path: Path) -> Path:
    return DOCS / f"{rel(path)}.html"


def directory_output_for(path: Path) -> Path:
    if path == ROOT:
        return DOCS / "index.html"
    return DOCS / rel(path) / "index.html"


def is_readable(path: Path) -> bool:
    if path.name in SPECIAL_FILENAMES:
        return True
    return path.suffix.lower() in READABLE_EXTENSIONS


def discover_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        parts = set(path.relative_to(ROOT).parts)
        if parts & EXCLUDED_DIRS:
            continue
        if path.parent == SITE and path.name in {"index.html", "styles.css", "app.js", "generate_docs.py"}:
            continue
        if is_readable(path):
            files.append(path)
    return sorted(files, key=lambda item: rel(item).lower())


def page_shell(
    title: str,
    subtitle: str,
    body: str,
    source_path: str,
    current_output: Path,
    runnable_code: str | None = None,
) -> str:
    site_home = os.path.relpath(SITE / "index.html", current_output.parent).replace(os.sep, "/")
    docs_home = os.path.relpath(DOCS / "index.html", current_output.parent).replace(os.sep, "/")
    runner = build_runner(source_path, runnable_code) if runnable_code is not None else ""
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(title)} - Self-Internship Reader</title>
    <style>
      :root {{
        --bg: #f7f5ef;
        --surface: #fffdf8;
        --ink: #171812;
        --muted: #696a61;
        --line: #d9d1c2;
        --accent: #0f766e;
        --accent-soft: #d8f1ea;
        --code: #101511;
      }}
      * {{ box-sizing: border-box; }}
      body {{
        margin: 0;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--ink);
        background: var(--bg);
        line-height: 1.65;
      }}
      a {{ color: var(--accent); font-weight: 750; text-decoration: none; }}
      a:hover {{ text-decoration: underline; }}
      .reader-top {{
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: center;
        min-height: 60px;
        padding: 0 5vw;
        border-bottom: 1px solid var(--line);
        background: rgba(247, 245, 239, 0.92);
        backdrop-filter: blur(14px);
      }}
      .reader-top a {{ color: var(--ink); }}
      .hero {{
        padding: 64px 5vw 38px;
        color: white;
        background:
          linear-gradient(90deg, rgba(30, 43, 38, 0.98), rgba(30, 43, 38, 0.82)),
          radial-gradient(circle at 80% 20%, rgba(45, 212, 191, 0.35), transparent 34%),
          #1e2b26;
      }}
      .hero p {{ max-width: 940px; margin: 0; color: rgba(255, 255, 255, 0.76); }}
      .run-panel {{
        display: grid;
        gap: 14px;
        padding: 22px 5vw;
        border-bottom: 1px solid var(--line);
        background: var(--surface);
      }}
      .run-actions {{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }}
      .run-button {{
        min-height: 42px;
        padding: 0 14px;
        border: 0;
        border-radius: 8px;
        color: #06231f;
        background: #5eead4;
        cursor: pointer;
        font: inherit;
        font-weight: 900;
      }}
      .run-note {{
        margin: 0;
        color: var(--muted);
      }}
      .run-output {{
        display: none;
        max-height: 420px;
        overflow: auto;
        margin: 0;
      }}
      .run-output.is-visible {{ display: block; }}
      h1 {{
        max-width: 980px;
        margin: 0 0 16px;
        font-size: clamp(38px, 6vw, 82px);
        line-height: 0.98;
        letter-spacing: 0;
      }}
      .path {{
        display: inline-block;
        max-width: 100%;
        margin-top: 18px;
        padding: 8px 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 8px;
        overflow-wrap: anywhere;
        font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
        font-size: 13px;
      }}
      .layout {{
        display: grid;
        grid-template-columns: minmax(0, 1fr) 280px;
        gap: 36px;
        width: min(1320px, 100%);
        margin: 0 auto;
        padding: 44px 5vw 90px;
      }}
      .content {{
        min-width: 0;
        padding: 32px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
      }}
      .toc {{
        position: sticky;
        top: 86px;
        align-self: start;
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
      }}
      .toc h2 {{ margin: 0 0 10px; font-size: 15px; text-transform: uppercase; }}
      .toc a {{ display: block; margin: 8px 0; color: var(--muted); font-size: 14px; }}
      h2, h3, h4 {{ line-height: 1.16; letter-spacing: 0; }}
      h2 {{ margin-top: 42px; padding-top: 24px; border-top: 1px solid var(--line); font-size: clamp(28px, 3.8vw, 46px); }}
      h3 {{ margin-top: 32px; font-size: 26px; }}
      h4 {{ margin-top: 24px; font-size: 19px; }}
      p {{ margin: 0 0 18px; }}
      ul, ol {{ padding-left: 24px; }}
      li {{ margin: 6px 0; }}
      blockquote {{
        margin: 24px 0;
        padding: 18px 20px;
        border-left: 4px solid var(--accent);
        background: var(--accent-soft);
      }}
      table {{
        width: 100%;
        margin: 24px 0;
        border-collapse: collapse;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
        font-size: 15px;
      }}
      th, td {{ padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }}
      th {{ text-align: left; background: var(--accent-soft); }}
      tr:last-child td {{ border-bottom: 0; }}
      code {{
        padding: 2px 5px;
        border-radius: 5px;
        background: #ece7da;
        font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
        font-size: 0.92em;
      }}
      pre {{
        overflow: auto;
        margin: 24px 0;
        padding: 18px;
        border-radius: 8px;
        color: #f5f1e8;
        background: var(--code);
        line-height: 1.55;
      }}
      pre code {{ padding: 0; color: inherit; background: transparent; }}
      .dir-list {{
        display: grid;
        gap: 10px;
        margin-top: 20px;
      }}
      .dir-item {{
        display: grid;
        gap: 4px;
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fffaf0;
      }}
      .dir-item span {{
        color: var(--muted);
        overflow-wrap: anywhere;
        font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
        font-size: 12px;
      }}
      @media (max-width: 900px) {{
        .layout {{ grid-template-columns: 1fr; }}
        .toc {{ position: static; order: -1; }}
        .content {{ padding: 22px; }}
      }}
    </style>
  </head>
  <body>
    <nav class="reader-top">
      <a href="{site_home}">Back to website</a>
      <a href="{site_home}#python-lab">Python lab</a>
      <a href="{docs_home}">Docs index</a>
    </nav>
    <header class="hero">
      <h1>{html.escape(title)}</h1>
      <p>{html.escape(subtitle)}</p>
      <div class="path">{html.escape(source_path)}</div>
    </header>
    {runner}
    <main class="layout">
      <article class="content">{body}</article>
      <aside class="toc">{build_toc(body)}</aside>
    </main>
  </body>
</html>
"""


def build_runner(source_path: str, code: str | None) -> str:
    if code is None:
        return ""
    payload = json.dumps(code)
    key = f"readerRun:{source_path}"
    return f"""
    <section class="run-panel" aria-label="Run this Python file">
      <div class="run-actions">
        <button class="run-button" id="runReaderCode" type="button">Run Python</button>
        <button class="run-button" id="clearReaderOutput" type="button">Clear saved output</button>
        <p class="run-note" id="runStatus">Runs the exact Python code shown below. Output is saved in this browser.</p>
      </div>
      <pre class="run-output" id="runOutput"></pre>
    </section>
    <script>
      const readerCode = {payload};
      const readerOutputKey = {json.dumps(key)};
      const output = document.getElementById("runOutput");
      const status = document.getElementById("runStatus");
      const saved = localStorage.getItem(readerOutputKey);
      if (saved) {{
        output.textContent = saved;
        output.classList.add("is-visible");
        status.textContent = "Saved output restored. You do not need to run again unless you change the file.";
      }}

      let pyodideReady = null;
      async function ensurePyodide() {{
        if (window.pyodide) return window.pyodide;
        if (!pyodideReady) {{
          status.textContent = "Loading Python runner from CDN...";
          pyodideReady = new Promise((resolve, reject) => {{
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
            script.onload = async () => {{
              try {{
                window.pyodide = await loadPyodide();
                resolve(window.pyodide);
              }} catch (error) {{
                reject(error);
              }}
            }};
            script.onerror = () => reject(new Error("Could not load Pyodide. Check internet access."));
            document.head.appendChild(script);
          }});
        }}
        return pyodideReady;
      }}

      function indentPython(source) {{
        return source.split("\\n").map((line) => "    " + line).join("\\n");
      }}

      document.getElementById("runReaderCode").addEventListener("click", async () => {{
        output.classList.add("is-visible");
        output.textContent = "Running...";
        try {{
          const pyodide = await ensurePyodide();
          const wrapped = `
import sys, io, traceback
_stdout = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _stdout
try:
${{indentPython(readerCode)}}
except Exception:
    traceback.print_exc(file=_stdout)
finally:
    sys.stdout = _old_stdout
_reader_output = _stdout.getvalue()
`;
          pyodide.runPython(wrapped);
          const result = pyodide.globals.get("_reader_output") || "Code ran with no printed output.";
          output.textContent = result;
          localStorage.setItem(readerOutputKey, result);
          status.textContent = "Output saved. It will appear again after refresh.";
        }} catch (error) {{
          const message = String(error.message || error);
          output.textContent = message + "\\n\\nSome project files need packages such as pandas, scikit-learn, Django, FastAPI, or hardware access. Those may need to be run locally in your Python environment.";
          localStorage.setItem(readerOutputKey, output.textContent);
          status.textContent = "Runner could not complete this file.";
        }}
      }});

      document.getElementById("clearReaderOutput").addEventListener("click", () => {{
        localStorage.removeItem(readerOutputKey);
        output.textContent = "";
        output.classList.remove("is-visible");
        status.textContent = "Saved output cleared.";
      }});
    </script>
    """


def slugify(text: str) -> str:
    value = re.sub(r"<[^>]+>", "", text)
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return value or "section"


def inline_markdown(text: str) -> str:
    text = html.escape(text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    return text


def parse_table(lines: list[str], index: int) -> tuple[str | None, int]:
    if index + 1 >= len(lines):
        return None, index
    header = lines[index]
    divider = lines[index + 1]
    if "|" not in header or not re.match(r"^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$", divider):
        return None, index

    def cells(row: str) -> list[str]:
        row = row.strip().strip("|")
        return [inline_markdown(cell.strip()) for cell in row.split("|")]

    heads = cells(header)
    rows: list[list[str]] = []
    cursor = index + 2
    while cursor < len(lines) and "|" in lines[cursor].strip():
        rows.append(cells(lines[cursor]))
        cursor += 1

    body = "<table><thead><tr>"
    body += "".join(f"<th>{cell}</th>" for cell in heads)
    body += "</tr></thead><tbody>"
    for row in rows:
        body += "<tr>" + "".join(f"<td>{cell}</td>" for cell in row) + "</tr>"
    body += "</tbody></table>"
    return body, cursor


def markdown_to_html(text: str) -> str:
    lines = text.replace("\r\n", "\n").split("\n")
    chunks: list[str] = []
    paragraph: list[str] = []
    in_code = False
    code_lines: list[str] = []
    code_lang = ""
    list_type: str | None = None

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            chunks.append(f"<p>{inline_markdown(' '.join(paragraph).strip())}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal list_type
        if list_type:
            chunks.append(f"</{list_type}>")
            list_type = None

    cursor = 0
    while cursor < len(lines):
        line = lines[cursor]
        stripped = line.strip()

        if stripped.startswith("```"):
            if in_code:
                chunks.append(f'<pre><code class="language-{html.escape(code_lang)}">{html.escape(chr(10).join(code_lines))}</code></pre>')
                code_lines = []
                code_lang = ""
                in_code = False
            else:
                flush_paragraph()
                close_list()
                in_code = True
                code_lang = stripped.strip("`").strip()
            cursor += 1
            continue

        if in_code:
            code_lines.append(line)
            cursor += 1
            continue

        table_html, next_cursor = parse_table(lines, cursor)
        if table_html:
            flush_paragraph()
            close_list()
            chunks.append(table_html)
            cursor = next_cursor
            continue

        if not stripped or stripped in {"---", "***"}:
            flush_paragraph()
            close_list()
            cursor += 1
            continue

        heading = re.match(r"^(#{1,4})\s+(.+)$", stripped)
        if heading:
            flush_paragraph()
            close_list()
            level = min(len(heading.group(1)) + 1, 4)
            title = inline_markdown(heading.group(2).strip())
            chunks.append(f'<h{level} id="{slugify(title)}">{title}</h{level}>')
            cursor += 1
            continue

        if stripped.startswith(">"):
            flush_paragraph()
            close_list()
            quote = stripped.lstrip(">").strip()
            chunks.append(f"<blockquote>{inline_markdown(quote)}</blockquote>")
            cursor += 1
            continue

        unordered = re.match(r"^[-*]\s+(.+)$", stripped)
        ordered = re.match(r"^\d+\.\s+(.+)$", stripped)
        if unordered or ordered:
            flush_paragraph()
            desired = "ul" if unordered else "ol"
            if list_type != desired:
                close_list()
                chunks.append(f"<{desired}>")
                list_type = desired
            item = unordered.group(1) if unordered else ordered.group(1)
            chunks.append(f"<li>{inline_markdown(item)}</li>")
            cursor += 1
            continue

        close_list()
        paragraph.append(stripped)
        cursor += 1

    flush_paragraph()
    close_list()
    if in_code:
        chunks.append(f"<pre><code>{html.escape(chr(10).join(code_lines))}</code></pre>")
    return "\n".join(chunks)


def code_to_html(text: str) -> str:
    return f"<pre><code>{html.escape(text)}</code></pre>"


def title_for(path: Path) -> str:
    if path.name.lower() == "readme.md":
        return path.parent.name.replace("-", " ").title() or "Self Internship"
    return path.name.replace("_", " ").replace("-", " ").replace(".md", "").title()


def subtitle_for(path: Path) -> str:
    ext = path.suffix.lower()
    if ext == ".md":
        return "Clean reading view with headings, tables, lists, links, and code blocks rendered for study."
    return "Clean code reading view for studying, copying, and comparing your own implementation."


def write_file_page(path: Path) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    body = markdown_to_html(text) if path.suffix.lower() == ".md" else code_to_html(text)
    output = output_for(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    runnable_code = text if path.suffix.lower() == ".py" else None
    output.write_text(page_shell(title_for(path), subtitle_for(path), body, rel(path), output, runnable_code), encoding="utf-8")


def html_link_from_dir(directory: Path, target: Path) -> str:
    current = directory_output_for(directory).parent
    return os.path.relpath(output_for(target), current).replace(os.sep, "/")


def write_directory_page(directory: Path, readable_files: list[Path]) -> None:
    direct_files = [path for path in readable_files if path.parent == directory]
    direct_dirs = sorted(
        {
            path.parent if path.parent.parent == directory else directory / path.relative_to(directory).parts[0]
            for path in readable_files
            if path != directory and directory in path.parents and path.parent != directory
        },
        key=lambda item: rel(item).lower(),
    )
    if not direct_files and not direct_dirs:
        return

    items: list[str] = []
    for child in direct_dirs:
        href = os.path.relpath(directory_output_for(child), directory_output_for(directory).parent).replace(os.sep, "/")
        items.append(f'<a class="dir-item" href="{href}"><strong>{html.escape(child.name)}/</strong><span>{html.escape(rel(child))}</span></a>')
    for file in direct_files:
        items.append(f'<a class="dir-item" href="{html_link_from_dir(directory, file)}"><strong>{html.escape(file.name)}</strong><span>{html.escape(rel(file))}</span></a>')

    body = f"<h2>Readable files</h2><p>Choose a file or folder. Markdown is rendered cleanly, and code files are shown in a focused reading view.</p><div class=\"dir-list\">{''.join(items)}</div>"
    output = directory_output_for(directory)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(page_shell(directory.name or "Self Internship Docs", "Clean index for this workspace folder.", body, rel(directory) if directory != ROOT else ".", output), encoding="utf-8")


def manifest_title(path: Path) -> str:
    parts = path.relative_to(ROOT).parts
    if path.name.lower() == "readme.md" and len(parts) > 1:
        return f"{path.parent.name.replace('-', ' ').title()} README"
    return path.name


def manifest_kind(path: Path) -> str:
    if path.suffix.lower() == ".md":
        return "Guide"
    if path.suffix.lower() == ".py":
        return "Python"
    if path.suffix.lower() == ".sql":
        return "SQL"
    if path.suffix.lower() == ".ino":
        return "Arduino"
    if path.suffix.lower() == ".sh":
        return "Shell"
    if path.name == "Dockerfile":
        return "Docker"
    if path.suffix.lower() == ".java":
        return "Java"
    return "File"


def write_manifest(files: list[Path]) -> None:
    items = []
    for file in files:
        items.append(
            {
                "title": manifest_title(file),
                "kind": manifest_kind(file),
                "path": rel(file),
                "url": os.path.relpath(output_for(file), SITE).replace(os.sep, "/"),
            }
        )
    manifest = "window.DOCS_MANIFEST = "
    manifest += json.dumps(items, indent=2)
    manifest += ";\n"
    (SITE / "docs-manifest.js").write_text(manifest, encoding="utf-8")


def build_toc(body: str) -> str:
    headings = re.findall(r'<h([2-4]) id="([^"]+)">(.*?)</h\1>', body)
    if not headings:
        return "<h2>On this page</h2><p>No headings found.</p>"
    links = ['<h2>On this page</h2>']
    for level, anchor, title in headings[:24]:
        indent = int(level) - 2
        links.append(f'<a style="margin-left:{indent * 12}px" href="#{anchor}">{re.sub(r"<[^>]+>", "", title)}</a>')
    return "".join(links)


def main() -> None:
    if DOCS.exists():
        for path in sorted(DOCS.rglob("*"), reverse=True):
            if path.is_file():
                path.unlink()
            elif path.is_dir():
                try:
                    path.rmdir()
                except PermissionError:
                    # OneDrive can briefly lock empty generated folders on Windows.
                    # Leaving the folder is safe because generated pages are overwritten below.
                    pass
    DOCS.mkdir(parents=True, exist_ok=True)

    files = discover_files()
    for file in files:
        write_file_page(file)

    directories = {ROOT}
    for file in files:
        directories.update(parent for parent in file.parents if parent == ROOT or ROOT in parent.parents)
    for directory in sorted(directories, key=lambda item: rel(item) if item != ROOT else ""):
        if directory == DOCS or DOCS in directory.parents:
            continue
        if ROOT not in directory.parents and directory != ROOT:
            continue
        write_directory_page(directory, files)

    write_manifest(files)

    print(f"Generated {len(files)} readable file pages in {DOCS}")


if __name__ == "__main__":
    main()
