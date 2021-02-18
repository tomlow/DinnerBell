import { connection } from "../boot.js"
import IngredientSeeder from "./seeders/IngredientSeeder.js"
class Seeder {
  static async seed() {
    console.log("Seeding ingredients...")
    await IngredientSeeder.seed()


    //eventual recipe seeds
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder