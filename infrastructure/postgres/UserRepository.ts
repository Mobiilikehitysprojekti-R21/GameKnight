import UserRepository from "../../ports/UserRepository";
import User from "../../domain/User";
import { Pool } from "pg";

class PostgresUserRepository extends UserRepository {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    super();
    this.pool = pool;
  }

  async save(user: User): Promise<User> {
    const result = await this.pool.query(
      `INSERT INTO users (email, password, nickname)
       VALUES ($1, $2, $3)
       RETURNING user_id, email, password, nickname`,
      [user.email, user.password, user.nickname]
    );
    if (result.rows.length > 0) {
      const row = result.rows[0];
      return new User({
        user_id: row.user_id,
        email: row.email,
        password: row.password,
        nickname: row.nickname,
      });
    } else {
      throw new Error("Failed to insert user");
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) return undefined;

    const row = result.rows[0];

    return new User({
      user_id: row.user_id,
      email: row.email,
      password: row.password,
      nickname: row.nickname,
    });
  }

  async findById(user_id: string): Promise<User | undefined> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [user_id]
    );

    if (result.rowCount === 0) return undefined;

    const row = result.rows[0];

    return new User({
      user_id: row.user_id,
      email: row.email,
      password: row.password,
      nickname: row.nickname,
    });
  }
}

export default PostgresUserRepository;
