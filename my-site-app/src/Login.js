import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

// エラーコードを日本語に変換する関数
const translateErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "ユーザーが見つかりません";
    case "auth/wrong-password":
      return "パスワードが間違っています";
    case "auth/invalid-email":
      return "メールアドレスの形式が正しくありません";
    case "auth/missing-password":
      return "パスワードを入力してください";
    default:
      return "エラーが発生しました";
  }
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      alert("ログイン成功！");
      navigate("/home");
    } catch (err) {
      const japaneseMessage = translateErrorMessage(err.code);
      setError(japaneseMessage);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ログイン
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        アカウントをお持ちでない方は{" "}
        <Link to="/signup" style={{ color: "#007bff", textDecoration: "underline" }}>
          こちらから新規登録
        </Link>
      </p>

      {error && (
        <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Login;
