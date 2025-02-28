import Footer from "../client-customer/Footer";
import Header from "../client-customer/Header";
import error from "./../../assets/images/error.png";
export default function PageNotFound() {
  return (
    <div>
      <Header />
      <img src={error} alt="" />
      <Footer />
    </div>
  );
}
