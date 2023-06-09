import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation()

  // cart operation
  const handleAddToCart = (item) => {
    console.log("Item added", item);

      if (user && user.email) {
        const cartItem = { menuItemId: _id, name, image, price ,email: user.email};
        fetch("http://localhost:5000/carts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
              if (data.insertedId) {
                  refetch();  // refetch cart to update number of items cart
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Food Added on the Cart",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
    }
    else {
      Swal.fire({
        title: "Please Log In to order the food",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "LogIn Now!",
      }).then((result) => {
        if (result.isConfirmed) {
            navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline bg-slate-600 border-0 border-b-4 text-white mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
