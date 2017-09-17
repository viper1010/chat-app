const env = process.env.NODE_ENV || 'development';
console.log("ENV = ", env);

if(env === 'development')
{
  process.env.PORT = 3000;
}
else if(env === 'test')
{
  process.env.PORT = 3000;
}
