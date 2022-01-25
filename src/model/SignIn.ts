import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import md5 from 'md5';
import { User } from 'src/entity/User';

export class SignIn {
  username: string;
  password: string;
  user: User;
  error: string;

  async validate() {
    const connection = await getDatabaseConnection();
    const user = await connection.manager.findOne(User, {
      username: this.username,
    });
    this.user = user;
    if (user) {
      if (user.passwordDigest !== md5(this.password)) {
        this.error = '密码错误';
      }
    } else {
      this.error = '用户名不存在';
    }
    if (this.username.trim() === '') {
      this.error = '请填写用户名';
    }
  }
}
