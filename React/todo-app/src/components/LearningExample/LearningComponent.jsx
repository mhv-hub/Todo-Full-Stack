import MyFirstComponent from './MyFirstComponent';
import MySecondComponent from './MySecondComponent';
import { MyThirdComponent } from './MyFirstComponent';
import ExploringJavascript from './ExploringJavascript';

export default function LearningComponent() {
    return (
        <div className="App">
            Demo application !!
            <MyFirstComponent></MyFirstComponent>
            <MySecondComponent />
            <MyThirdComponent />
            <ExploringJavascript />
        </div>
    );
}