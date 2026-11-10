import os
from google.genai import types

def write_file(working_directory, file_path, content):
    try: 
        abs_path = os.path.abspath(working_directory)
        target_directory = os.path.normpath(os.path.join(abs_path, file_path))
        common_path = os.path.commonpath([abs_path, target_directory])
        valid = common_path == abs_path

        if not valid:
            return f'Error: Cannot write to "{file_path}" as it is outside the permitted working directory'
        
        if os.path.isdir(target_directory):
            return f'Error: Cannot write to "{file_path}" as it is a directory'

        os.makedirs(os.path.dirname(target_directory),exist_ok=True)

        with open(target_directory, "w") as f:
            f.write(content)
        
        return f'Successfully wrote to "{file_path}" ({len(content)} characters written)'
    except Exception as e:
        return f"Error: {e}"


schema_write_file = types.FunctionDeclaration(
    name="write_file",
    description="given a file and content, this function will overwrite and modify the existing file's content.",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "working_directory": types.Schema(
                type=types.Type.STRING,
                description="Directory path to list files from, relative to the working directory (default is the working directory itself)",
            ),
            "file_path": types.Schema(
                type=types.Type.STRING,
                description="File path for the target file to be fetched and have its content read. File path should be within the working_directory",
            ),
            "content": types.Schema(
                type=types.Type.STRING,
                description="File content to be written into target file",
            ),
        },
    ),
)
