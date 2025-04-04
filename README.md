!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Email: lenghaithuy@gmail.com

BACKEND:

<span style="color: red;">Using mongoDb</span>

**Install configs for Server**

S1 : create configs folder, and configsDb inside configs folder
<br>
S2: Ctrl + V this into your configsDb -->

```javascript

    require('dotenv').config()
    const {mongoose, connect} = require('mongoose')

    const dbUrl = **Replace your connection string**

    const connectDB = async()=>{
    try {
    const connection =await mongoose.connect(dbUrl)
    console.log(`Connect to mongodb successfully!!!`);

        } catch (error) {
            console.log(error);
            process.exit(1)
        }

    }
    module.exports = connectDB

```

**Setting your .env**

SECRET_KEY: your secret key

EMAIL: your email (send verification email to user)

PASS_EMAIL: your app password, **https://support.google.com/mail/answer/185833?hl=en**
