import { connect } from "react-redux";
import View from "../components/View";

const mapStateToProps = (state) => ({
    routePlan: state.routePlan, //把state 的views作為Props傳給子元素
})
export default connect(mapStateToProps)(View);