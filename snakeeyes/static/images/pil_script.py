from PIL import Image
import os

for file in os.listdir('.'):
    if file.endswith('.jpg') or file.endswith('.jpeg'):
        filename, file_ext = os.path.splitext(file)
        image_400 = Image.open(file)
        image_2000 = Image.open(file)
        image_400.thumbnail((400, 400))
        image_2000.thumbnail((2000, 2000))
        image_400.save('400/{}{}'.format(filename, file_ext))
        image_2000.save('2000/{}{}'.format(filename, file_ext))
