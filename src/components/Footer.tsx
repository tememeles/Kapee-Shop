
import PaymentImg from "../assets/1.png"; // adjust the path if needed

const Footer = () => {
  return (
    <div className="flex-between bg-gray-50 border p-4 text-gray-500 text-sm shadow-md">
      <div className="mt-2 flex justify-between">
        <p>Kapee © 2025 by PressLayouts All Rights Reserved.</p>
        <img src={PaymentImg} alt="Payment Methods" className=" object-contain" />
      </div>
    </div>
  );
};

export default Footer;
