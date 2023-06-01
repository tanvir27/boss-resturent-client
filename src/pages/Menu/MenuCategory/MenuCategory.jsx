
import { Link } from 'react-router-dom';
import Cover from '../../Shared/Cover/Cover';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const MenuCategory = ({items, title, img}) => {
    return (
      <div className="pt-8">
        {title && <Cover img={img} title={title}></Cover>}
        <div className="grid md:grid-cols-2 gap-10 my-16">
          {items.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
        <Link to={`/order/${title}`}>
          <div className="text-center ">
            <button className="btn btn-outline bg-slate-500 border-0 border-b-4 my-4 text-white">
              Order Now
            </button>
          </div>
        </Link>
      </div>
    );
};

export default MenuCategory;