import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div className={ classes.root }>
      <NavigationBar />
      <div style={{paddingBottom: "5em"}}>
        <main className={classes.main}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
