export default function () {
    return (<div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">ERROR: BAD CREDENTIALS</h3>
                    <p className="text-center mt-2">
                        <a href="auth">Login again?</a>
                    </p>
                </div>
            </form>
        </div>
    );
}