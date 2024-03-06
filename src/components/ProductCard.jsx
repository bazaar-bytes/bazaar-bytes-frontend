export const ProductCard = ({ product }) => {
  const { name } = product;
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};
