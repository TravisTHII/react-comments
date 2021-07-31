import mongoose from 'mongoose'
import colors from 'colors/safe'

export const mongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(
      colors.cyan(
        colors.bold(
          colors.underline(`MongoDB Connected: ${conn.connection.host}`)
        )
      )
    )
  } catch (error) {
    console.log(colors.red(`Error: ${error.message}`))
    process.exit(1)
  }
}
