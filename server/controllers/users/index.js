const { users, posts } = require('../../models');
const {
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require('../token');
const crypto = require('crypto');

module.exports = {
  login: async (req, res) => {
    // 로그인
    // 데이터 받아서, 디비 조회, 유저 정보로 토큰만들기,
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: 'Invalid request' });
    } else {
      await users
        .findOne({
          where: { email },
        })
        .then((data) => {
          if (!data) {
            // db에 정보가 없을때
            res.status(400).send({ message: '존재하지 않는 유저 입니다.' });
          } else {
            // 토큰생성 및 쿠키로 전달
            // 보낼때 비번 정보 제외
            const dbPassword = data.dataValues.password;
            const salt = data.dataValues.salt;
            const hashPassword = crypto
              .createHash('sha512')
              .update(password + salt)
              .digest('hex');
            if (dbPassword === hashPassword) {
              const { id, username, profile, email } = data.dataValues;
              const accessToken = generateAccessToken({
                id,
                username,
                profile,
                email,
              });
              res.status(200);
              sendAccessToken(res, accessToken);
            } else {
              res.status(400).send({ message: '비밀번호가 틀립니다' });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    }
  },
  logout: (req, res) => {
    // 로그아웃
    // 쿠키 정보 삭제
    res.status(200).clearCookie('jwt').send({ message: 'logout suceess' });
  },
  signup: async (req, res) => {
    // 회원가입
    //  디비 컬럼 추가하고, 있으면 거절
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).send({ message: 'Invalid request' });
    } else {
      const salt = Math.round(new Date().valueOf() * Math.random()) + '';
      const hashPassword = crypto
        .createHash('sha512')
        .update(password + salt)
        .digest('hex');
      await users
        .findOrCreate({
          where: { email },
          defaults: {
            username,
            password: hashPassword,
            salt: salt,
          },
        })
        .then(([result, created]) => {
          if (!created) {
            // 겹치는 이메일이 있는경우
            res.status(400).send({ message: 'e-mail already exists' });
          } else {
            res.status(201).send({ message: '회원가입 완료' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    }
  },
  signout: async (req, res) => {
    // 회원탈퇴
    // 토큰 검증 한 내용으로 db 유저의 아이디 칼럼 destroy
    const verify = isAuthorized(req);
    if (!verify) {
      res.status(400).send({ message: 'Invalid Token' });
    } else {
      const { id, email } = verify;
      await users
        .destroy({
          where: { id, email },
        })
        .then((data) => {
          res
            .status(200)
            .clearCookie('jwt')
            .send({ message: 'delete user infomation & token' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    }
  },
  post: async (req, res) => {
    // include / 최신 작성이 위로 올라오게
    // 해당유저의 작성한 게시글 불러오기
    const verify = isAuthorized(req);
    const { userId } = req.body;
    if (verify) {
      await posts
        .findAll({
          order: [['id', 'desc']],
          where: {
            userId,
          },
          attributes: ['id', 'title', 'content', 'stack', 'done'],
        })
        .then((data) => {
          // console.log(data);
          res.status(200).send({ post: data });
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    } else {
      res.status(400).send({ message: 'invalid Token' });
    }
  },
  userInfo: async (req, res) => {
    // 유저 정보 변경
    const verify = isAuthorized(req);
    if (!verify) {
      res.status(400).send({ message: 'Invalid Token' });
    } else {
      const { username, email, profile } = verify;
      await users
        .findOne({
          where: { email },
        })
        .then((data) => {
          if (data) {
            users
              .update(
                {
                  username,
                  profile,
                },
                {
                  where: { email },
                },
              )
              .then((data) => {
                res.status(200).send({ message: 'user information changed' });
              });
          } else {
            res.status(400).send({ message: '존재하지 않는 유저입니다.' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    }
  },
  password: async (req, res) => {
    // 유저 비밀번호 변경 원래비번 바꿀 비번 들어옴 원래 비번이 맞으면 바꿀비번으로 바꿔줌
    const verify = isAuthorized(req);
    if (!verify) {
      res.status(400).send({ message: 'Invalid Token' });
    } else {
      const { email, password, newpassword } = verify;

      await users
        .findOne({
          where: { email, password },
        })
        .then((data) => {
          if (data) {
            users
              .update(
                {
                  password: newpassword,
                },
                {
                  where: { email: email },
                },
              )
              .then(() => {
                // 클라에서 password confirm 유효성 검사 했다는 가정
                res.status(200).send({ message: ' password changed' });
              });
          } else {
            // 기존 비번을 틀렸을때
            res.status(400).send({ message: 'wrong password' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    }
  },
};
// {id,username, profile,email,password}
