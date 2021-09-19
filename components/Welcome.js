const Welcome = () => {
  return (
    <div className="welcome__container">
      <div className='welcome__form'>
          <h2>Log in to your account</h2>

          <label htmlFor='email'>Email Address</label>
          <input type='email' id='email' required/>

          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required/>
      </div>
      <div className='welcome__image'>display Image with brief description</div>
    </div>
  );
};

export default Welcome;
