import React, { useState, useEffect } from 'react';
import {
  Dimmer,
  Loader,
  Segment,
  Placeholder,
  Message,
} from 'semantic-ui-react';
import axios from 'axios';
import $ from 'jquery';

const MsfdDataExplorerBlockView = (props) => {
  const [content, setContent] = React.useState('');
  const [loading, setloading] = useState(true);
  const { editable } = props;
  const { article_select } = props.data;

  useEffect(() => {
    if (article_select) {
      axios
        .get(`/marine/++api++/${article_select}`)
        .then((res) => {
          const el = document.createElement('div');
          el.innerHTML = res.data;
          const msfdContent = el.querySelector('.msfd-search-wrapper');
          setContent(msfdContent);
        })
        .catch((err) => {
          setContent({ data: <div>Something went wrong.</div> });
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [article_select]);

  useEffect(() => {
    if (window !== undefined) {
      window.$ = $;
      window.jQuery = $;
      global.jQuery = $;
    }

    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.4/select2.min.js',
      '/marine/++api++/++resource++msfd/js/jquery-ui.js',
      '/marine/++api++/++resource++msfd/js/tabs.js',
      '/marine/++api++/++resource++msfd/js/msfd_search.js',
    ];

    if (!loading) {
      scripts.forEach((element) => {
        const script = document.createElement('script');
        script.src = element;
        script.setAttribute('type', 'text/javascript');
        // script.async = 'true';

        document.body.appendChild(script);
      });
    }
  }, [loading]);

  return (
    <>
      {article_select ? (
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
      ) : (
        <>{editable ? <Message>Select article</Message> : ''}</>
      )}
    </>
  );
};

export default MsfdDataExplorerBlockView;
