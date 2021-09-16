import { useState } from "react";

const RequestByText = () => {
  const [text, setText] = useState("");
  const [product, setProduct] = useState();
  const [erroClick, setErroClcik] = useState(false);
  const [erroProduct, setErroProduct] = useState(false);

  const handleRequest = (value) => {
    if (value.length > 1) {
      fetch(`https://api.github.com/repos/${value}`)
        .then((response) => {
          if (response.status !== 200) {
            setErroProduct(true);
            return;
          }

          response.json().then((response) => setProduct(response));
        })
        .catch((err) => console.log(err));
    } else if (value.length === 0) {
      setErroClcik(true);
    }
  };

  return (
    <div className="InputArea">
      <input
        placeholder="Usuário / repositório"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleRequest(text)}>Enviar</button>

      {product ? (
        <>
          {product.full_name ? (
            <div className="productDesc">
              <div className="productImg">
                <img alt={product.name} src={product.owner.avatar_url}></img>
              </div>
              <div className="productInfo">
                <h3>{product.full_name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <> </>
      )}

      {erroClick ? <span>Defina sua busca</span> : <></>}

      {erroProduct ? (
        <>
          <span>Produto não existe</span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RequestByText;
