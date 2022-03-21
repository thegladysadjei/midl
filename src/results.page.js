import { useNavigate } from 'react-router-dom'
import './results.page.css'
export const ResultsPage = () => {
    const navigate = useNavigate();
    return (
        <div className="results">
            <div className="spots">
                <div className='pointer m24' onClick={() => {
                    navigate('/search')
                }}>Go back to search</div>
                spots here
            </div>
            <div className="map">
                map here
            </div>
        </div>
    )
}