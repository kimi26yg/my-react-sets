function ProductCard({ product }) {
  return (
    <div>
      <h3>
        {product.name}
        {product.isBest && "🏆"}
      </h3>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  );
}

function ProductList() {
  const products = [
    { id: 1, name: "맥북 프로", price: 2500000, isBest: true },
    { id: 2, name: "아이패드", price: 1200000 },
    { id: 3, name: "에어팟", price: 250000 },
  ];

  return (
    <div>
      <h2>🛒 상품 목록</h2>
      {
        /* 여기에 상품목록 렌더링 */
        products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))
      }
    </div>
  );
}

export default ProductList;
