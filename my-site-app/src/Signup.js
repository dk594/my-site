import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // 登録成功後にホームへ遷移
    } catch (err) {
      // エラーメッセージを日本語化（最低限）
      if (err.code === "auth/email-already-in-use") {
        setError("このメールアドレスはすでに使われています。");
      } else if (err.code === "auth/invalid-email") {
        setError("メールアドレスの形式が正しくありません。");
      } else if (err.code === "auth/weak-password") {
        setError("パスワードは6文字以上にしてください。");
      } else {
        setError("新規登録に失敗しました。");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>新規登録</h2>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="パスワード（6文字以上）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">登録する</button>
      </form>
    </div>
  );
}

export default Signup;
