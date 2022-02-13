import NavigationBar from "./NavigationBar";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div className={ classes.root }>
      <NavigationBar />
      <div >
        <main className={classes.main}>{props.children}</main>
      </div>
      <footer> Hey add a footer that looks pretty here</footer>
    </div>
  );
}

export default Layout;
