import CartItem from "../CartItem";
function CartListView({ cartList, onIncrement, onDecrement, onRemove }) {
  return (
    <ul className="pl-0 w-full">
      {cartList.map((eachItem) => (
        <CartItem
          key={eachItem.id}
          cartItemDetails={eachItem}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

export default CartListView;