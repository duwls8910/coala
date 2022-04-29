const { posts, users } = require('../../models');

module.exports = {
  allUser: async (req, res) => {
    // 전체 유저 목록
    // 비번 솔트 업데이트 일을 제외한 모든 정보
    await users
      .findAll({
        attributes: { exclude: ['password', 'salt', 'updatedAt'] },
      })
      .then((data) => {
        res.status(200).send({ message: '요청 성공', userInfo: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },
  findUser: async (req, res) => {
    // 특정 유저 검색
    // 이메일, 유저 네임으로 검색
  },
  delUser: async (req, res) => {
    // 특정 유저 탈퇴
    const { id } = req.body;
    await users
      .destroy({
        where: { id: id },
      })
      .then((data) => {
        res.status(200).send({ message: '요청성공' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },
  delPost: async (req, res) => {
    // 특정 컨텐츠 삭제
    const { id } = req.body;
    await posts
      .destroy({
        where: { id: id },
      })
      .then(() => {
        res.status(200).send({ message: '요청성공' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  },
};
// 어드민 계정을 로그인하면 어드민 주소로 보내는 방법
// 배포상 서버 에러 핸들링 하기
