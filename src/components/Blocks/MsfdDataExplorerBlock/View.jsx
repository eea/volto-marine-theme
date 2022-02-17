import React, { useState, useEffect } from 'react';
import { Dimmer, Loader, Segment, Placeholder } from 'semantic-ui-react';
import axios from 'axios';
import $ from 'jquery';

const MsfdDataExplorerBlockView = (props) => {
  const [content, setContent] = React.useState('');
  const [loading, setloading] = useState(true);
  const { data } = props;

  useEffect(() => {
    axios
      .get(`/api/++api++/${data.article_select}`)
      .then((res) => {
        const el = document.createElement('div');
        el.innerHTML = res.data;
        const content = el.querySelector('.msfd-search-wrapper');
        setContent(content);
      })
      .catch((err) => {
        setContent({ data: <div>Something went wrong.</div> });
      })
      .finally(() => {
        setloading(false);
      });
  }, [data.article_select]);

  useEffect(() => {
    if (window !== undefined) {
      window.$ = $;
      window.jQuery = $;
      global.jQuery = $;
    }

    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.4/select2.min.js',
      '/api/++api++/++resource++msfd/js/jquery-ui.js',
      '/api/++api++/++resource++msfd/js/tabs.js',
      '/api/++api++/++resource++msfd/js/msfd_search.js',
    ];

    if (!loading) {
      scripts.forEach((element) => {
        const script = document.createElement('script');
        script.src = element;
        script.setAttribute('type', 'text/javascript');
        script.async = 'true';

        document.body.appendChild(script);
      });
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        </Segment>
      ) : (
        <div>
          <div dangerouslySetInnerHTML={{ __html: content.outerHTML }} />
        </div>
      )}
    </div>
  );
};

export default MsfdDataExplorerBlockView;