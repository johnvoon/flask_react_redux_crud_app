from PIL import Image
import os

for file in os.listdir('.'):
    filename, file_ext = os.path.splitext(file)
    if file.endswith('.jpeg'):
        os.rename(file,'{}.jpg'.format(filename))
    
    if file.endswith('.jpg') or file.endswith('.png'):
        image_64 = Image.open(file)
        image_400 = Image.open(file)
        image_600 = Image.open(file)
        image_1000 = Image.open(file)
        image_2000 = Image.open(file)

        image_64.thumbnail((64, 64))
        image_400.thumbnail((400, 400))
        image_600.thumbnail((600, 600))
        image_1000.thumbnail((1000, 1000))
        image_2000.thumbnail((2000, 2000))

        image_64.save('64/{}'.format(file))
        image_400.save('400/{}'.format(file))
        image_600.save('600/{}'.format(file))
        image_1000.save('1000/{}'.format(file))
        image_2000.save('2000/{}'.format(file))
