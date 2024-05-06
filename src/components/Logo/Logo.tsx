
import './logo.css'
import { IoPerson } from "react-icons/io5";
const Logo = ({collapedTheme, darkTheme}) => {
    return (
        <div className="logo">
            <div className="logo-icon">
                <IoPerson/>
            </div>
            <h1 hidden={collapedTheme} className={`Title-sidebar ${!darkTheme ? 'dark-color' : ''}`}>Quản trị viên cao cấp</h1>
        </div>
    )
}

export default Logo