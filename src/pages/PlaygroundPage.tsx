import OrderStatusSelector from "../components/OrderStatusSelector";

const PlaygroundPage = () => {
  return (
    <OrderStatusSelector
      onChange={function (status: string): void {
        console.log("Function not implemented.", status);
      }}
    />
  );
};

export default PlaygroundPage;
