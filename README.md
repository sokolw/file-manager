[RU] Проект: **file-manager** 
- `Используйте версию Node.js: LTS 16.15.0`
- Написано в Windows 10 Enterprise LTSC 2019
- Программа запускается с помощью npm-script, для запуска используйте команду:
```bash
npm run start -- --username=your_username
```

**Описание функционала:**

- Навигация & рабочий каталог
    - Контракт для использования путей с пробелами:
        - Заключите путь с пробелами в двойные кавычки: `"C:\Program Files\Test File.txt"`
        - Если путь с пробелами не будет заключен в кавычки, то будет уведомление о неправильном вводе.
    - Перейти наверх из текущего каталога, без аргументов.
    ```bash
    up
    ```
    - Перейти в существующую папку из текущего каталога (`path_to_directory` может быть относительным или абсолютным)
    ```bash
    cd path_to_directory
    ```
    - Выводит список всех файлов и папок в консоль, без аргументов.
    ```bash
    ls
    ```

- Операции с файлами
    - Читает файл и выводит его содержимое в консоль:
        - `Если файл не существует выдаст ошибку.`
    ```bash
    cat path_to_file
    ```
    - Создает пустой файл в текущем рабочем каталоге:
        - `Если файл с таким именем уже существует, то выдаст ошибку.`
    ```bash
    add new_file_name
    ```
    - Переименовать файл: 
        - `Если файл не существует выдаст ошибку.`
        - `Если в имя нового файла совпадает с каким-нибудь именем файла в каталоге, то файл в каталоге заменится переименованным файлом.`
    ```bash
    rn path_to_file new_filename
    ```
    - Копировать файл: 
        - `Если исходный файл не существует выдаст ошибку.`
        - `Если имя результирующего файла совпадет с файлом в каталоге, то операция не выполнится.`
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Переместить файл: 
        - `Если исходный файл не существует выдаст ошибку.`
        - `Если имя результирующего файла совпадет с файлом в каталоге, то операция не выполнится.`
        - `Исходный файл удалится.`
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Удалить файл:
        - `Если исходный файл не существует выдаст ошибку.`
    ```bash
    rm path_to_file
    ```

- Информация об операционной системе
    - Получить EOL (конец строки в системе по умолчанию)
    ```bash
    os --EOL
    ```
    - Получить информацию о процессорах хост-машины:
        - `Поддерживается вывод в GHz только для x64 архитектуры. Нет возможности протестировать на других.`
        - `Для других будет выведено model: ... , speed: ... и тд.`
    ```bash
    os --cpus
    ```
    - Получить домашний каталог: 
    ```bash
    os --homedir
    ```
    - Получить текущее - имя пользователя системы
    ```bash
    os --username
    ```
    - Получить архитектуру ЦП, для которой был скомпилирован двоичный файл Node.js.
    ```bash
    os --architecture
    ```

- Расчет хэша  
    - Вычислить хэш для файла и вывести его в консоль
        - `Если исходный файл не существует выдаст ошибку.`
    ```bash
    hash path_to_file
    ```
- Операции сжатия и распаковки c использованием алгоритма Brotli
    - Сжать файл
        - `Операция не выполнится если сжимаемый файл уже существует.`
        - `При указании папки, сжимаемый файл будет иметь полное исходное название с добавлением расширения: `**.br**
        - `При указании названия  сжимаемого файла , будет добавлено расширение: `
    ```bash
    compress path_to_file path_to_destination
    ```
    - Распаковать файл
        - `Операция не выполнится если распакованный файл уже существует.`
        - `Операция не выполнится если у исходного файла нету расрирения: `**.br**
        - `При указании папки, распакованный файл будет иметь полное исходное название с удалением расширения: `**.br**
    ```bash
    decompress path_to_file path_to_destination
    ```
[EN] Project: **file-manager**
- `Use Node.js version: LTS 16.15.0`
- Written in Windows 10 Enterprise LTSC 2019
- The program is started by npm-script start in following way:
```bash
npm run start -- --username=your_username
```

**Functional description:**

- Navigation & working directory
    - Contract for using paths with spaces:
        - Enclose the path with spaces in double quotes: `"C:\Program Files\Test File.txt"`
        - If the path with spaces is not enclosed in quotation marks, then there will be a notification of invalid input.
    - Move up from the current directory, no arguments.
    ```bash
    up
    ```
    - Navigate to an existing folder from the current directory (`path_to_directory` can be relative or absolute)
    ```bash
    cd path_to_directory
    ```
    - Prints a list of all files and folders to the console, without arguments.
    ```bash
    ls
    ```

- File operations
    - Reads a file and prints its contents to the console:
        - `If the file does not exist, it will throw an error.`
    ```bash
    cat path_to_file
    ```
    - Creates an empty file in the current working directory:
        - `If a file with the same name already exists, it will throw an error.`
    ```bash
    add new_file_name
    ```
    - Rename file:
        - `If the file does not exist, it will throw an error.`
        - `If the name of the new file matches any filename in the directory, the file in the directory will be replaced by the renamed file.`
    ```bash
    rn path_to_file new_filename
    ```
    - Copy file:
        - `If the source file does not exist, an error will be thrown.`
        - `If the resulting filename matches a file in the directory, the operation will fail.`
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Move file:
        - `If the source file does not exist, an error will be thrown.`
        - `If the resulting filename matches a file in the directory, the operation will fail.`
        - `The original file will be deleted.`
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Delete a file:
        - `If the source file does not exist, an error will be thrown.`
    ```bash
    rm path_to_file
    ```

- Operating system information
    - Get EOL (end of line in the system by default)
    ```bash
    os --EOL
    ```
    - Get information about the processors of the host machine:
        - `Ghz output is supported only for x64 architecture. There is no way to test on others.`
        - `For others, model: ... , speed: ... etc. will be printed.`
    ```bash
    os --cpus
    ```
    - Get home directory:
    ```bash
    os --homedir
    ```
    - Get current - system username
    ```bash
    os --username
    ```
    - Get the CPU architecture for which the Node.js binary was compiled.
    ```bash
    os --architecture
    ```

- Hash calculation
    - Calculate the hash for the file and print it to the console
        - `If the source file does not exist, an error will be thrown.`
    ```bash
    hash path_to_file
    ```
- Compression and decompression operations using the Brotli algorithm
    - Compress file
        - ʻOperation will fail if the file to be compressed already exists.`
        - `When specifying a folder, the compressed file will have the full original name with the extension added: `**.br**
        - `When specifying the name of the compressed file , the extension will be added: `
    ```bash
    compress path_to_file path_to_destination
    ```
    - Unzip file
        - `The operation will fail if the unpacked file already exists.`
        - `The operation will fail if the source file does not have the extension: `**.br**
        - `When specifying a folder, the unpacked file will have the full original name with the extension removed: `**.br**
    ```bash
    decompress path_to_file path_to_destination
    ```