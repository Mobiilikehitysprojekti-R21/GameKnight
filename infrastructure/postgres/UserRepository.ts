import UserRepository from "../../ports/UserRepository";
import User from "../../domain/User";
import { Pool } from "pg";

class PostgresUserRepository extends UserRepository {
  private readonly pool: Pool

  constructor(pool: Pool) {
    super()
    this.pool = pool
  }
  
  async save(user: User): Promise<void> {
    await this.pool.query(
      `INSERT INTO users (email, password, nickname)
       VALUES ($1, $2, $3)`,
      [user.email, user.password, user.nickname]
    );
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) return undefined

    const row = result.rows[0]

    return new User({ 
      user_id: row.user_id, 
      email: row.email, 
      password: row.password, 
      nickname: row.nickname });
  }


  async findById(user_id: string): Promise<User | undefined> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [user_id]
    );

    if (result.rowCount === 0) return undefined

    const row = result.rows[0]

    return new User({ 
      user_id: row.user_id, 
      email: row.email, 
      password: row.password, 
      nickname: row.nickname });
  }
}

export default PostgresUserRepository;
