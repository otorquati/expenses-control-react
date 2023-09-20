function RegisterPage() {
    return (
       <>
        <form>
                <div>
                    <div><label>Email</label></div>
                    <input type="email" placeholder="seu@email.com" />
                </div>
                <div>
                    <div><label>Senha</label></div>
                    <input type="passsword" placeholder="Senha" />
                </div>
                <div>
                    <div><label>Email</label></div>
                    <input type="password" placeholder="Confirmar senha" />
                </div>
                <div>
                    <button type="button">Registrar</button>
                </div>
                <div>
                    <button type="button">Login</button>
                </div>
        </form>
       </>
    )
}

export default RegisterPage;