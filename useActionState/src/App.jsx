import { useActionState } from "react";

function App() {
  const handleSubmit = async (previousData, formData) => {
    let name = formData.get("name");
    let password = formData.get("password");

    // simulate server delay
    await new Promise((res) => setTimeout(res, 2000));

    console.log(password, name);

    if (name && password) {
      return { message: "✅ Data submitted successfully",name,password };
    } else {
      return { error: "❌ Failed to submit" ,name,password};
    }
  };

  // useActionState gives us state, action fn, and pending flag
  const [data, action, pending] = useActionState(handleSubmit, undefined);

  return (
    <>
      <h1>useActionState Demo</h1>
      <form action={action}>
        <input defaultValue={data?.name}
          type="text"
          placeholder="Enter username"
          name="name"
          style={{
            color: "#2e7d32",
            background: "rgba(248, 248, 216, 0.5)",
            width: "220px",
            padding: "12px",
            border: "2px solid rgba(46, 125, 50, 0.6)",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            backdropFilter: "blur(6px)",
            fontFamily: "Arial, sans-serif",
          }}
        />
        <br />
        <br />
        <input defaultValue={ data?.password}
          type="password"
          placeholder="Enter password"
          name="password"
          style={{
            color: "#2e7d32",
            background: "rgba(250, 250, 235, 0.5)",
            width: "220px",
            padding: "12px",
            border: "2px solid rgba(46, 125, 50, 0.6)",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            backdropFilter: "blur(6px)",
            fontFamily: "Arial, sans-serif",
          }}
        />
        <br />
        <br />
        <button
          type="submit"
          disabled={pending}
          style={{
            color: "#2e7d32",
            background: "rgba(255, 255, 0, 0.5)",
            width: "150px",
            padding: "10px",
            border: "2px solid rgba(46, 125, 50, 0.6)",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            backdropFilter: "blur(6px)",
            fontFamily: "Arial, sans-serif",
            marginLeft: "50px",
          }}
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* show result */}
      {data?.message && <p style={{ color: "green" }}>{data.message}</p>}
      {data?.error && <p style={{ color: "red" }}>{data.error}</p>}
      <h3>Name : {data?.name}</h3>
      <h3>Password : {data?.password}</h3>

    </>
    
  );
}

export default App;
