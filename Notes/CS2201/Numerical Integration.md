# Numerical Integration

Some functions cannot be integrated analytically. Numerical integration applies the definition of a definite integral, which is the area under the curve, to calculate the integral approximately. 

## Riemann sum 
Divide the interval into $N$ equally spaced intervals, and sum up the areas under the rectangles formed by them. 


```python
import numpy as np

f = lambda x: x**3 
analytic_integral = 1/4

def IntegrateRiemann(f, a=0., b=1., N=10):
    X, h = np.linspace(a, b, N+1, retstep = True)
    return h * sum(f(X[1:-1]))

numeric_integral = IntegrateRiemann(f, 0., 1., 10)
print("Numeric integral: %6f \nAnalytic integral: %6f \nDifference: %6f" \
     % (numeric_integral, analytic_integral, abs(numeric_integral-analytic_integral))) 
```
```
Numeric integral: 0.202500 
Analytic integral: 0.250000 
Difference: 0.047500
```

An improvement can be achieved by calculating the the function at the midpoints of the $N$ intervals


```python
import numpy as np

f = lambda x: x**3 
analytic_integral = 1/4

def IntegrateRiemann_mid(f, a=0., b=1., N=10):
    X, h = np.linspace(a, b, N+1, retstep = True)
    return h * sum(f(X[1:-1] + h/2))

numeric_integral_mid = IntegrateRiemann_mid(f, 0., 1., 10)
print("Numeric integral: %6f \nAnalytic integral: %6f \nDifference: %6f" \
     % (numeric_integral_mid, analytic_integral, abs(numeric_integral_mid-analytic_integral))) 
```
```
Numeric integral: 0.248738 
Analytic integral: 0.250000 
Difference: 0.001262
```

## Trapezoidal rule
Divide the interval into $N$ equally spaced intervals. A trapezoidal approximation to the area in the interval $[x_n,x_{n+1}]$ is 
$$
A = \frac{h}{2}  \cdot\left[f(x_n)+f(x_{n+1})\right]
$$
Summing the areas for all the intervals gives 
$$
I = h\left[\frac{f(a)+f(b)}{2} + f(a+h) + f(a+2h) + \cdots + f(a+(N-1)h)\right]
$$


```python
import numpy as np

f = lambda x: x**3 
analytic_integral = 1/4

def IntegrateTrapezoid(f, a=0., b=1., N=10):
    X, h = np.linspace(a, b, N+1, retstep = True)
    I = 0.5 * (f(X[0]) + f(X[-1]))
    I += sum(f(X[1:-1])) # sum of all terms excluding the first and the last
    I *= h 
    return I
    
numeric_integral = IntegrateTrapezoid(f, 0., 1., 10)
print("Numeric integral: %6f \nAnalytic integral: %6f \nDifference: %6f" \
     % (numeric_integral, analytic_integral, abs(numeric_integral-analytic_integral))) 
```

```
Numeric integral: 0.252500 
Analytic integral: 0.250000 
Difference: 0.002500
```

## Simpson's rule

A quadratic polynomial can be uniquely specified by three points. If the $x$ coordinates are $-h, 0,$ and $h$, substituting in the general equation of a quadratic $(y=a_0+a_1x+a_2x^2$) and solving gives,
$$
\begin{align*}
a_0 &= f(0) \\
a_1 &= \frac{f(h)-f(-h)}{2h} \\
a_2 &= \frac{f(h)+f(-h)-2f(0)}{2h^2}
\end{align*}
$$

The integral under this quadratic, in the interval $[-h,h]$ is given by,
$$
\begin{align*}
I &= \int_{-h}^{h}(a_0+a_1x+a_2x^2)dx \\
 &= 2a_0h+\frac{2}{3}a_2h^3\\
 &= h\left(2f(0) + \frac{f(h)+f(-h)-2f(0)}{3}\right)\\
 &= \frac{h}{3}(f(h)+4f(0)+f(-h))
\end{align*}
$$
This applies for any general interval with three equispaced points. Summing over all such pairs of intervals in our original interval, 
$$
\begin{align*}
I & \approx \frac{h}{3}\big[(f(a)+4f(a+h)+f(a+2h))\\
&+ (f(a+2h)+4f(a+3h)+f(a+4h)) \\
&+ \cdots\big]\\\\
&=  \frac{h}{3}\big[f(a)+f(b)\\ 
&+ 4(f(a+h)+f(a+3h)+\cdots)\\&+2(f(a+2h)+f(a+4h)+\cdots)\big]
\end{align*}
$$
In general, the algorithm is specified by 
1. Sum the first and last terms.
2. Sum four times the odd terms $(f(a+n_{\text {odd} }h$). 
3. Sum two times the even terms excluding the final term, $f(b)$. 
4. Multiply the sum of above results by $h/3$.

>One point to note is that the number of intervals need to be even. Equivalently, the number of sample points need to odd. 


```python
import numpy as np

f = lambda x: x**3 
analytic_integral = 1/4

def IntegrateSimpson(f, a=0., b=1., N=10):
    if N % 2 != 0:
        raise Exception("Error: even number of inputs required")
    X, h = np.linspace(a, b, N+1, retstep = True)
    I = (f(X[0]) + f(X[-1])) # sum the first and last terms
    I += 4 * sum(f(X[1:-1:2])) # sum the odd terms and multiply by 4
    I += 2 * sum(f(X[2:-1:2])) # sum the even terms, exclude the last term, multiply by 2
    I *= (h/3) 
    return I
    
numeric_integral = IntegrateSimpson(f, 0., 1., 10)
print("Numeric integral: %10.10f \nAnalytic integral: %10.10f \nDifference: %10.10f" \
     % (numeric_integral, analytic_integral, abs(numeric_integral-analytic_integral))) 
```
```
Numeric integral: 0.2500000000 
Analytic integral: 0.2500000000 
Difference: 0.0000000000
```
