import M from "materialize-css";
import { Link } from "react-router-dom";

const Sidebar=()=>{
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });
    return(

        <>
            {/* <nav> </nav> */}

                <ul id="slide-out" class="sidenav">
                <li><div class="user-view">
                    <div class="background">
                    <img src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"/>
                    </div>
                    <a href="#user"><img class="circle" src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80"/></a>
                    <a href="#name"><span class="white-text name">John Doe</span></a>
                    <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
                </div></li>
                <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div class="divider"></div></li>
                <li><a class="subheader">Subheader</a></li>
                <li><Link to="/admin/addAdmin">Add admin</Link></li>
                </ul>
                <a href="#" data-target="slide-out" class="sidenav-trigger btn-floating btn-large waves-effect waves-light red" style={{position:"absolute", right:"10px", bottom:"10px"}}><i class="material-icons">menu</i></a>

        </>


    )
}
export default Sidebar;