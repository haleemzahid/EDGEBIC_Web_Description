import os
import re
import subprocess

# Get the marketing directory path
marketing_dir = r"e:\EDGEBIC_Web_Description\app\(app)\(marketing)"

# Get all files with dark: classes using grep
try:
    result = subprocess.run(
        ['grep', '-r', 'dark:', marketing_dir, '-l'],
        capture_output=True,
        text=True,
        shell=False
    )

    files = [f.strip() for f in result.stdout.strip().split('\n') if f.strip()]
    print(f"Found {len(files)} files with dark: classes\n")

    processed = 0
    skipped = 0
    errors = 0

    for file_path in files:
        try:
            # Read the file
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Remove dark: classes using regex
            # This pattern matches: space + dark: + any non-whitespace characters
            content = re.sub(r'\s+dark:[^\s"\'`}>\]]+', '', content)

            # Write back if changes were made
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                processed += 1
                print(f"✓ Processed: {file_path}")
            else:
                skipped += 1
                print(f"○ No changes needed: {file_path}")

        except Exception as e:
            errors += 1
            print(f"✗ Error processing {file_path}: {str(e)}")

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Processed: {processed} files")
    print(f"  Skipped: {skipped} files")
    print(f"  Errors: {errors} files")
    print(f"  Total: {len(files)} files")
    print(f"{'='*60}")

except Exception as e:
    print(f"Error: {str(e)}")
