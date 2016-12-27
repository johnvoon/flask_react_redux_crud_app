from PIL import Image
import os

size_400 = (400, 400)

for file in os.listdir('.'):
    if file.endswith('.jpg') or file.endswith('.jpeg'):
        image = Image.open(file)
        filename, file_ext = os.path.splitext(file)

        image.thumbnail(size_400)
        image.save('400/{}{}'.format(filename, '.jpg'))
