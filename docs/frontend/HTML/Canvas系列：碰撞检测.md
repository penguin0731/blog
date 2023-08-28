# Canvas系列：碰撞检测

碰撞检测，顾名思义就是两个物体是否发生碰撞。在 Canvas 中的碰撞检测，其实就是检测两个元素是否相交或相切。

## 圆与圆

圆与圆之间的碰撞很简单，只需要将两圆的圆心距离和两圆的半径之和做比较即可。若两圆的圆心距离大于两圆的半径之和，那么说明两圆没有发生碰撞；如果相等，则说明两圆相切，即刚好碰撞在一起。如果小于，则说明两圆相交。

![image-20230808151546294](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202308081515426.png)

两圆心分别为(x1, y1)，(x2, y2)，求两圆心距离公式为：   $ distance = \sqrt {(x1 - x2)^2 + (y1 - y2)^2} $

检测方法如下：


```js
function isCollisionCircleAndCircle(circle1, circle2) {
  const radiusSum = circle1.radius + circle2.radius;
  // 1.
  // const x = (circle1.x - circle2.x) ** 2;
  // const y = (circle1.y - circle2.y) ** 2;
  // return Math.sqrt(x + y) >= radiusSum;
  // 2.
  return Math.hypot(circle1.x - circle2.x, circle1.y - circle2.y) >= radiusSum;
}
```



## 矩形与矩形

矩形与矩形的碰撞也很简单，一般情况下，矩形的原点是左上角的顶点。那么在这个基础下，矩形与矩形之间没有发生碰撞的情况有四种，即矩形在另一个矩形的上下左右面，其余情况都是相交或相切。

![image-20230808151604033](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202308081516086.png)

检测方法如下：

```js
function isCollisionRectAndRect(rect1, rect2) {
  // rect1在rect2左边
  const isOnLeft = rect1.x + rect1.width < rect2.x;
  // rect1在rect2右边
  const isOnRight = rect1.x > rect2.x + rect2.width;
  // rect1在rect2上边
  const isOnTop = rect1.y + rect1.height < rect2.y;
  // rect1在rect2下边
  const isOnBottom = rect1.y > rect2.y + rect2.height;
  return !(isOnLeft || isOnRight || isOnTop || isOnBottom);
}
```



## 圆与矩形

圆与矩形的碰撞比上面两种碰撞要复杂一点，因此计算量也比较多。

首先像矩形与矩形一样，圆在矩形的上下左右面这四种情况都不属于碰撞。

![image-20230808151725384](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202308081517472.png)

除了上述四种情况，还有四种情况也不属于碰撞，即圆在矩形的左上、右上、左下、右下四个角。这四种情况，需要拿到矩形四个顶点的坐标，分别计算与圆心的距离是否小于圆的半径，若小于则是发生碰撞。

![image-20230808151853484](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com/img/202308081518568.png)

检测方法如下：

```js
function isCollisionCircleAndRect(circle, rect) {
  // circle在rect左边
  const isOnLeft = circle.x + circle.radius < rect.x;
  // circle在rect右边
  const isOnRight = circle.x - circle.radius > rect.x + rect.width;
  // circle在rect上边
  const isOnTop = circle.y + circle.radius < rect.y;
  // circle在rect下边
  const isOnBottom = circle.y - circle.radius > rect2.y + rect2.height;
  if (isOnLeft || isOnRight || isOnTop || isOnBottom) return false;
  
  // circle在rect的四个角
  if (circle.x < rect.x) {
  	  if (circle.y < rect.y) { // circle在rect左上角
        return Math.hypot(circle.x - rect.x, circle.y - rect.y) < circle.radius;
      }else if (circle.y > rect.y + rect.height) { // circle在rect左下角
        return Math.hypot(circle.x - rect.x, circle.y - (rect.y + rect.height)) < circle.radius;
      }
  } else if (circle.x > rect.x + rect.width) {
    if (circle.y < rect.y) { // circle在rect右上角
      return Math.hypot(circle.x - (rect.x + rect.width), circle.y - rect.y) < circle.radius;
    } else if (circle.y > rect.y + rect.height) { // circle在rect右下角
      return Math.hypot(circle.x - (rect.x +rect.width), circle.y - (rect.y + rect.height)) < circle.radius;
    }
  }
  
  return true;
}
```

