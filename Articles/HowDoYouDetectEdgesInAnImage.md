#### How do you detect edges in an image? 

The answer is so simple that I’ll spoil it here: go through each pixel in the image, and measure the difference between in color intensities between the current pixel and its neighboring pixel. If the difference is small, color the current pixel black and if large, color it white. 



However, viewing the above procedure in a proper mathematical framework can allow us to extend it to suit different needs. To begin with, what is an image? For our purposes, an image is a matrix of colors. Assuming that the colors are greyscale (meaning all the colors that can be obtained by mixing *white* and *black* in different proportions) simplifies the math quite a bit. With this constraint, the image is now a matrix of numbers, where a $0$ denotes pure black, and $1$ denotes pure white. 



This allows us to see an image as a function of two variables: an $x$ coordinate and a $y$ coordinate. This perspective allows us to apply the methods of multivariable calculus to the image.   