const express=require('express')
const app=express()
const Student = require('./model/student')
const Class = require('./model/Class')
const User=require('./model/User')
const connectDB=require('./db')
const cors=require('cors')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const {registerSchema,studentSchema}  = require('./utils/joiSchema')
// console.log("Loaded models:", Object.keys(require.cache)
//   .filter(p => p.includes("model"))
// )
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));


app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: false,
  
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Not authorized" });
    }

function isAuthorized(Model, idParam='id', authorField='author') {
  return async (req, res, next) => {
    const id = req.params[idParam];
    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    if (!item[authorField].equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};


connectDB()

app.get("/",isLoggedIn,(req,res)=>{
    res.send("hello there")
})
app.get('/students',isLoggedIn,async(req,res)=>{
    const students=await Student.find({}).populate('classId')
res.send(students)
})
app.get('/classes',isLoggedIn,async(req,res)=>{
    const classes=await Class.find({}).populate("students")
    res.send(classes)
})
app.post('/register',async (req,res)=>{
const {error,value}=registerSchema.validate(req.body)
if(error){return res.status(400).json({ message: error.details[0].message })}
const {name,email,password}=value
const existing=await User.findOne({email})
if (existing)return res.status(400).json({message:'email already found'})
    const newuser=new User({name,email})    
    await User.register(newuser,password)
    res.json({message:'user registerd'})

})
app.post('/login',passport.authenticate("local"),(req,res)=>{
    res.json({ message: 'Logged in', user: req.user });
    
})
app.post('/students', isLoggedIn, async (req, res) => {
     const { error } = studentSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const newStud = new Student({
    ...req.body,
    author: req.user._id
  });
  await newStud.save();
  res.json(newStud);
});
app.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});
app.get('/privateData',(req,res)=>{
    res.send('this is private data')
})
app.get('/fakeData',(req,res)=>{
    res.send('this is fake data')
})
app.delete(
  '/students/:id',
  isLoggedIn,
  isAuthorized(Student, 'id', 'author'),
  async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  }
);
app.get("/me", (req, res) => {
  if (!req.user) return res.json(null);
  res.json(req.user);
});

app.listen(3000,()=>console.log("server connected to 9090"))