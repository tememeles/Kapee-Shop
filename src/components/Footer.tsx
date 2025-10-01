
import PaymentImg from "../assets/1.png"; // adjust the path if needed

const Footer = () => {
  return (
    <div className="bg-gray-50 border p-4 sm:p-6 text-gray-500 text-xs sm:text-sm shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-center sm:text-left">Kapee © 2025 by PressLayouts All Rights Reserved.</p>
        <img src={PaymentImg} alt="Payment Methods" className="object-contain max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Footer;
