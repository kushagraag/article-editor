import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Editor from "./Editor";
import ArticleList from "./ArticleList";
import Article from "./Article";
import AppLayout from "./AppLayout";
import PageNotFound from "./PageNotFound";

import "./Global.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="editor" />} />
            <Route path="editor" element={<Editor />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="article/:id" element={<Article />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
