const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'zfjg';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-requested-with, Content-Type, Accept, Authorization');
  if (req.method.toLowerCase() === 'options') {
    return res.end();
  }
  next();
});

app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.send({ test: 'test' });
});

// 1. 拿用户名,登录
app.post(('/login'), (req, res) => {
  const { username } = req.body;
  if (username === 'admin') {
    return res.json({
      data: {
        code: 0,
        username: 'admin',
        token: jwt.sign(
          {
            username: 'admin',
          },
          secret,
          {
            expiresIn: "36h",
          },
        ),
      }
    });
  } else {
    return res.json({
      data: {
        code: 1,
        msg: '该用户不存在',
      },
    });
  }
});

// 2. 验证token的可靠性
app.get("/validate", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.json({
        code: 1,
        msg: "token失效了"
      });
    };
    return res.json({
      code: 0,
      username: decode.username,
      token: jwt.sign({ username: "admin" }, secret, {
        expiresIn: "36h",
      })
    })
  })
});

app.listen(3000, () => {
  console.log('port at 3000');
});
