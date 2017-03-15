from PIL import Image
import os

for file in os.listdir('.'):
    if file.endswith('.jpg') or file.endswith('.jpeg') or file.endswith('png'):
        filename, file_ext = os.path.splitext(file)
        image_64 = Image.open(file)
        image_400 = Image.open(file)
        image_600 = Image.open(file)
        image_1000 = Image.open(file)

        image_64.thumbnail((64, 64))
        image_400.thumbnail((400, 400))
        image_600.thumbnail((600, 600))
        image_1000.thumbnail((1000, 1000))

        image_64.save('64/{}{}'.format(filename, file_ext))
        image_400.save('400/{}{}'.format(filename, file_ext))
        image_600.save('600/{}{}'.format(filename, file_ext))
        image_1000.save('1000/{}{}'.format(filename, file_ext))
