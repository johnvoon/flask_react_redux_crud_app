import configureStore from 'redux-mock-store';
import { normalizeResponseData, sortByDate } from 'utils';
import { postSchema } from 'constants/Schemas';
import thunk from 'redux-thunk';
import {
  fetchPosts,
  fetchPost,
  addPost,
  editPost,
  deletePost,
  postsLoaded,
  postLoaded,
  fetchRelatedPosts } from 'Entities/PostsActions';
import { 
  recordsLoaded,
  recordAdded,
  recordEdited,
  recordDeleted } from 'Admin/actions';
import { POSTS_LOADED, POST_LOADED } from 'constants/actionTypes';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mockStore = configureStore([thunk]);

describe('Posts actions', () => {
  const posts = [
    {
      "author": "Francesca Reilly",
      "authorPhoto": "https://www.conceptlawfirm.xyz/static/images/64/placeholder-user.png",
      "body": [
        "Mollitia ullam aspernatur officiis reprehenderit. Nihil corrupti corrupti impedit dicta. Voluptatem soluta sequi illum aliquam culpa odio. Quod libero neque quia hic.",
        "Itaque officia cupiditate aliquid explicabo perferendis expedita sequi. Corrupti quaerat at placeat error. Doloremque neque iure ratione molestiae tenetur perspiciatis. Ex expedita eveniet tempora ex quod earum repudiandae.",
        "Eaque sequi sit natus officiis molestiae qui harum. Maiores harum tenetur earum minus. Eligendi nostrum ipsa aspernatur aspernatur ut neque.",
        "Nulla adipisci rem quis rem eum ipsum non. Animi consequatur veniam accusamus. Repellendus repellendus sequi dignissimos.",
        "Molestias quia ullam quas animi magnam. Eos minus incidunt reiciendis. Autem corporis pariatur exercitationem ad dolor quod.",
        "Deserunt blanditiis nisi fugit. Iusto amet voluptate corrupti optio alias. Aut rerum quia occaecati dolorum eligendi quis.",
        "Dolorum tempore aliquam laborum eum dolore. Unde repellat perspiciatis magnam ducimus doloribus. Consequuntur iusto itaque architecto exercitationem pariatur.",
        "Accusamus adipisci reprehenderit sequi. Nemo aliquid voluptatibus voluptate neque ratione. Sit rerum totam quam placeat ex repellendus quo. Nesciunt voluptas libero expedita voluptatibus at.",
        "Dicta harum doloremque minus at officiis quod. Corporis odit quos totam officiis ex. Ut nemo tenetur suscipit hic dignissimos odio incidunt dolores.",
        "Vitae repudiandae sit temporibus in. Dolore officiis deserunt deleniti. Hic sed pariatur tempore voluptate corporis incidunt voluptas.",
        "Enim atque inventore tempore unde quia laborum earum error. Dolorum magnam dolorem debitis asperiores soluta minima quibusdam. Reprehenderit consectetur nisi incidunt qui.",
        "Et magni quos natus omnis magnam veniam. Aspernatur necessitatibus expedita maxime eius accusantium labore sint. Unde similique pariatur consequuntur ex porro occaecati perspiciatis. Fugit a cum fugit facilis.",
        "Et eum veniam occaecati nostrum nesciunt. Aspernatur dolorem odio exercitationem sit. Saepe atque quisquam pariatur ea nesciunt voluptas. Harum fugiat eum mollitia sapiente facere.",
        "Aspernatur suscipit pariatur illum atque necessitatibus. Minus minima pariatur consequatur mollitia. Accusamus ipsa necessitatibus tempore sint. Itaque repellat numquam ad suscipit dolor fugit perspiciatis.",
        "Doloribus in sunt ipsam vitae numquam adipisci. Quae beatae recusandae occaecati voluptates tenetur. Molestias enim quam voluptatibus itaque illo nobis perspiciatis. Illo esse hic esse illo autem asperiores.",
        "Accusamus nobis quia occaecati ipsa minima odit libero impedit. Eos impedit maxime ab perspiciatis. Minus maxime odit corporis laudantium beatae natus ullam. Beatae eligendi cupiditate rerum dolores iste reiciendis animi.",
        "Nostrum fugiat beatae culpa sunt. Dolor accusamus sint autem alias. Sint quo eveniet magni magnam. Neque nulla exercitationem autem possimus suscipit corrupti. Tenetur praesentium dolore vero atque consectetur reiciendis.",
        "Eos sunt quae reiciendis labore quibusdam. Accusantium sequi reiciendis saepe assumenda doloribus nemo asperiores. Voluptate quaerat nisi culpa sint.",
        "Magni quaerat porro adipisci debitis consectetur distinctio. Expedita velit fugiat maxime. Corrupti repellendus quos in quos. Quaerat optio mollitia voluptatum qui eaque illo.",
        "Neque impedit quisquam voluptate at hic amet quas. Nesciunt dolorem ea dolorum."
      ],
      "created": "Fri, 25 Mar 2016 12:11:30 GMT",
      "id": 1,
      "imgSrc": "https://www.conceptlawfirm.xyz/static/images/1000/write.jpg",
      "practiceArea": "Family Law",
      "slug": "voluptatum-illum-deserunt-sequi",
      "summary": "Qui id unde reiciendis sapiente quo eveniet autem ipsum.",
      "thumbnailSrc": "https://www.conceptlawfirm.xyz/static/images/400/write.jpg",
      "title": "Voluptatum illum deserunt sequi.",
      "updated": "Fri, 25 Mar 2016 12:11:30 GMT",
      "views": 0
    },
    {
      "author": "Martine Kerluke",
      "authorPhoto": "https://www.conceptlawfirm.xyz/static/images/64/placeholder-user.png",
      "body": [
        "Soluta nulla omnis expedita quis. Distinctio aut corrupti minus debitis autem dolores. Tenetur possimus minus minus tenetur ea earum non. Dolorem rerum adipisci excepturi inventore assumenda.",
        "Quod sapiente et dolorum odit deserunt. Vitae qui fuga velit adipisci nemo culpa assumenda. Voluptatum ipsum omnis suscipit suscipit dolor voluptatem minima. Maiores corporis labore reprehenderit occaecati voluptatum amet debitis.",
        "Sequi odit enim illum dolore reprehenderit ex blanditiis. Veritatis id fugit consequuntur voluptatibus quas atque ipsum.",
        "Repellat sint voluptas labore nam libero laudantium voluptas. Sint reiciendis facilis sit odio similique ex. Accusamus eaque officiis nisi cumque officia. Expedita illum rerum quae ratione repellat saepe asperiores.",
        "Dignissimos reiciendis est quasi amet ea ipsam. Doloribus exercitationem ratione doloribus molestias reprehenderit reiciendis. Esse esse eveniet eligendi rerum consectetur sit reiciendis suscipit.",
        "Nobis cumque explicabo necessitatibus dignissimos dolores similique. Hic ea ipsa molestias sit quidem maxime alias. Nostrum accusantium distinctio eum cumque dignissimos deserunt autem magni. Inventore eaque aperiam id voluptas reiciendis eaque. Laborum eos rerum placeat.",
        "Sunt deserunt accusamus qui libero officia ipsum. Fugiat ex nobis reiciendis magni occaecati minus earum. Minus eos quibusdam odio laboriosam impedit. Possimus tenetur illo sit labore vitae debitis facere.",
        "Aliquid laboriosam iste quaerat distinctio unde omnis earum ut. Earum voluptate nemo quibusdam asperiores occaecati soluta. Quam quae fugiat adipisci exercitationem fugit quaerat natus accusamus. Distinctio consequatur culpa aliquid.",
        "Reprehenderit tempora iure libero sed molestiae magni. Numquam iste illo ea hic id.",
        "Adipisci odit alias tempora suscipit at quisquam nulla maxime. Vero corporis facilis voluptas error temporibus iste qui. Vitae maiores quibusdam quo doloribus voluptate possimus asperiores. Eaque ducimus odit modi optio atque rerum eos.",
        "Expedita officia nisi facilis hic. Eius repellat sed tenetur culpa. Animi ut illo consequuntur saepe error.",
        "Excepturi eaque odit consequuntur dolore inventore pariatur architecto. Et labore temporibus harum est velit quos ullam. Earum iure sit ad exercitationem vitae illum esse. Doloribus maiores dolorem placeat similique sed nisi.",
        "Optio possimus vero cupiditate dolorum quod harum. Provident sunt molestias harum. Quae reprehenderit earum perspiciatis quas consequuntur repellendus.",
        "Rem vero repellendus autem veniam officia. Occaecati vero quidem ratione quae earum deleniti incidunt. Ea hic aspernatur veniam nihil.",
        "Labore expedita quos libero vero ea autem assumenda quaerat. Doloribus consectetur adipisci adipisci dicta amet. Commodi itaque tempore debitis magni eveniet corrupti quidem explicabo.",
        "Explicabo tenetur sunt soluta ullam pariatur. Eius hic id quia beatae. Cumque nam dicta libero id explicabo quae deserunt.",
        "Tenetur recusandae eos voluptate nisi iusto. Qui animi non quibusdam cum nesciunt provident. Veritatis suscipit accusantium nobis beatae voluptatum illum.",
        "Facere optio nostrum quos labore magni possimus. Itaque sunt quasi similique. Reprehenderit aspernatur corrupti veritatis corporis reiciendis odit. Impedit quas beatae similique eum inventore.",
        "Eveniet beatae incidunt a vel. Perspiciatis atque delectus minima earum. Ipsum doloremque ab laudantium sapiente magni numquam. Sunt eum nisi veritatis aliquam exercitationem labore.",
        "Itaque est pariatur non repellendus temporibus similique tempora. Pariatur facilis nobis id doloribus ducimus. Nemo et aliquid et adipisci. Ullam repudiandae consequatur quis amet."
      ],
      "created": "Sat, 07 Jan 2017 14:23:21 GMT",
      "id": 2,
      "imgSrc": "https://www.conceptlawfirm.xyz/static/images/1000/mergers.jpg",
      "practiceArea": "Family Law",
      "slug": "hic-facere-nisi-nesciunt-nesciunt-dolore-odit-voluptatum",
      "summary": "Ratione ipsum ipsum voluptas nihil veniam nemo numquam sequi necessitatibus.",
      "thumbnailSrc": "https://www.conceptlawfirm.xyz/static/images/400/mergers.jpg",
      "title": "Hic facere nisi nesciunt nesciunt dolore odit voluptatum.",
      "updated": "Sat, 07 Jan 2017 14:23:21 GMT",
      "views": 9
    }
  ];

  const relatedPosts = [
    {
      "author": "Martine Kerluke",
      "authorPhoto": "https://www.conceptlawfirm.xyz/static/images/64/placeholder-user.png",
      "body": [
        "Soluta nulla omnis expedita quis. Distinctio aut corrupti minus debitis autem dolores. Tenetur possimus minus minus tenetur ea earum non. Dolorem rerum adipisci excepturi inventore assumenda.",
        "Quod sapiente et dolorum odit deserunt. Vitae qui fuga velit adipisci nemo culpa assumenda. Voluptatum ipsum omnis suscipit suscipit dolor voluptatem minima. Maiores corporis labore reprehenderit occaecati voluptatum amet debitis.",
        "Sequi odit enim illum dolore reprehenderit ex blanditiis. Veritatis id fugit consequuntur voluptatibus quas atque ipsum.",
        "Repellat sint voluptas labore nam libero laudantium voluptas. Sint reiciendis facilis sit odio similique ex. Accusamus eaque officiis nisi cumque officia. Expedita illum rerum quae ratione repellat saepe asperiores.",
        "Dignissimos reiciendis est quasi amet ea ipsam. Doloribus exercitationem ratione doloribus molestias reprehenderit reiciendis. Esse esse eveniet eligendi rerum consectetur sit reiciendis suscipit.",
        "Nobis cumque explicabo necessitatibus dignissimos dolores similique. Hic ea ipsa molestias sit quidem maxime alias. Nostrum accusantium distinctio eum cumque dignissimos deserunt autem magni. Inventore eaque aperiam id voluptas reiciendis eaque. Laborum eos rerum placeat.",
        "Sunt deserunt accusamus qui libero officia ipsum. Fugiat ex nobis reiciendis magni occaecati minus earum. Minus eos quibusdam odio laboriosam impedit. Possimus tenetur illo sit labore vitae debitis facere.",
        "Aliquid laboriosam iste quaerat distinctio unde omnis earum ut. Earum voluptate nemo quibusdam asperiores occaecati soluta. Quam quae fugiat adipisci exercitationem fugit quaerat natus accusamus. Distinctio consequatur culpa aliquid.",
        "Reprehenderit tempora iure libero sed molestiae magni. Numquam iste illo ea hic id.",
        "Adipisci odit alias tempora suscipit at quisquam nulla maxime. Vero corporis facilis voluptas error temporibus iste qui. Vitae maiores quibusdam quo doloribus voluptate possimus asperiores. Eaque ducimus odit modi optio atque rerum eos.",
        "Expedita officia nisi facilis hic. Eius repellat sed tenetur culpa. Animi ut illo consequuntur saepe error.",
        "Excepturi eaque odit consequuntur dolore inventore pariatur architecto. Et labore temporibus harum est velit quos ullam. Earum iure sit ad exercitationem vitae illum esse. Doloribus maiores dolorem placeat similique sed nisi.",
        "Optio possimus vero cupiditate dolorum quod harum. Provident sunt molestias harum. Quae reprehenderit earum perspiciatis quas consequuntur repellendus.",
        "Rem vero repellendus autem veniam officia. Occaecati vero quidem ratione quae earum deleniti incidunt. Ea hic aspernatur veniam nihil.",
        "Labore expedita quos libero vero ea autem assumenda quaerat. Doloribus consectetur adipisci adipisci dicta amet. Commodi itaque tempore debitis magni eveniet corrupti quidem explicabo.",
        "Explicabo tenetur sunt soluta ullam pariatur. Eius hic id quia beatae. Cumque nam dicta libero id explicabo quae deserunt.",
        "Tenetur recusandae eos voluptate nisi iusto. Qui animi non quibusdam cum nesciunt provident. Veritatis suscipit accusantium nobis beatae voluptatum illum.",
        "Facere optio nostrum quos labore magni possimus. Itaque sunt quasi similique. Reprehenderit aspernatur corrupti veritatis corporis reiciendis odit. Impedit quas beatae similique eum inventore.",
        "Eveniet beatae incidunt a vel. Perspiciatis atque delectus minima earum. Ipsum doloremque ab laudantium sapiente magni numquam. Sunt eum nisi veritatis aliquam exercitationem labore.",
        "Itaque est pariatur non repellendus temporibus similique tempora. Pariatur facilis nobis id doloribus ducimus. Nemo et aliquid et adipisci. Ullam repudiandae consequatur quis amet."
      ],
      "created": "Sat, 07 Jan 2017 14:23:21 GMT",
      "id": 2,
      "imgSrc": "https://www.conceptlawfirm.xyz/static/images/1000/mergers.jpg",
      "practiceArea": "Family Law",
      "slug": "hic-facere-nisi-nesciunt-nesciunt-dolore-odit-voluptatum",
      "summary": "Ratione ipsum ipsum voluptas nihil veniam nemo numquam sequi necessitatibus.",
      "thumbnailSrc": "https://www.conceptlawfirm.xyz/static/images/400/mergers.jpg",
      "title": "Hic facere nisi nesciunt nesciunt dolore odit voluptatum.",
      "updated": "Sat, 07 Jan 2017 14:23:21 GMT",
      "views": 9
    }
  ];

  const post = {
    "author": "Francesca Reilly",
    "authorPhoto": "https://www.conceptlawfirm.xyz/static/images/64/placeholder-user.png",
    "body": [
      "Mollitia ullam aspernatur officiis reprehenderit. Nihil corrupti corrupti impedit dicta. Voluptatem soluta sequi illum aliquam culpa odio. Quod libero neque quia hic.",
      "Itaque officia cupiditate aliquid explicabo perferendis expedita sequi. Corrupti quaerat at placeat error. Doloremque neque iure ratione molestiae tenetur perspiciatis. Ex expedita eveniet tempora ex quod earum repudiandae.",
      "Eaque sequi sit natus officiis molestiae qui harum. Maiores harum tenetur earum minus. Eligendi nostrum ipsa aspernatur aspernatur ut neque.",
      "Nulla adipisci rem quis rem eum ipsum non. Animi consequatur veniam accusamus. Repellendus repellendus sequi dignissimos.",
      "Molestias quia ullam quas animi magnam. Eos minus incidunt reiciendis. Autem corporis pariatur exercitationem ad dolor quod.",
      "Deserunt blanditiis nisi fugit. Iusto amet voluptate corrupti optio alias. Aut rerum quia occaecati dolorum eligendi quis.",
      "Dolorum tempore aliquam laborum eum dolore. Unde repellat perspiciatis magnam ducimus doloribus. Consequuntur iusto itaque architecto exercitationem pariatur.",
      "Accusamus adipisci reprehenderit sequi. Nemo aliquid voluptatibus voluptate neque ratione. Sit rerum totam quam placeat ex repellendus quo. Nesciunt voluptas libero expedita voluptatibus at.",
      "Dicta harum doloremque minus at officiis quod. Corporis odit quos totam officiis ex. Ut nemo tenetur suscipit hic dignissimos odio incidunt dolores.",
      "Vitae repudiandae sit temporibus in. Dolore officiis deserunt deleniti. Hic sed pariatur tempore voluptate corporis incidunt voluptas.",
      "Enim atque inventore tempore unde quia laborum earum error. Dolorum magnam dolorem debitis asperiores soluta minima quibusdam. Reprehenderit consectetur nisi incidunt qui.",
      "Et magni quos natus omnis magnam veniam. Aspernatur necessitatibus expedita maxime eius accusantium labore sint. Unde similique pariatur consequuntur ex porro occaecati perspiciatis. Fugit a cum fugit facilis.",
      "Et eum veniam occaecati nostrum nesciunt. Aspernatur dolorem odio exercitationem sit. Saepe atque quisquam pariatur ea nesciunt voluptas. Harum fugiat eum mollitia sapiente facere.",
      "Aspernatur suscipit pariatur illum atque necessitatibus. Minus minima pariatur consequatur mollitia. Accusamus ipsa necessitatibus tempore sint. Itaque repellat numquam ad suscipit dolor fugit perspiciatis.",
      "Doloribus in sunt ipsam vitae numquam adipisci. Quae beatae recusandae occaecati voluptates tenetur. Molestias enim quam voluptatibus itaque illo nobis perspiciatis. Illo esse hic esse illo autem asperiores.",
      "Accusamus nobis quia occaecati ipsa minima odit libero impedit. Eos impedit maxime ab perspiciatis. Minus maxime odit corporis laudantium beatae natus ullam. Beatae eligendi cupiditate rerum dolores iste reiciendis animi.",
      "Nostrum fugiat beatae culpa sunt. Dolor accusamus sint autem alias. Sint quo eveniet magni magnam. Neque nulla exercitationem autem possimus suscipit corrupti. Tenetur praesentium dolore vero atque consectetur reiciendis.",
      "Eos sunt quae reiciendis labore quibusdam. Accusantium sequi reiciendis saepe assumenda doloribus nemo asperiores. Voluptate quaerat nisi culpa sint.",
      "Magni quaerat porro adipisci debitis consectetur distinctio. Expedita velit fugiat maxime. Corrupti repellendus quos in quos. Quaerat optio mollitia voluptatum qui eaque illo.",
      "Neque impedit quisquam voluptate at hic amet quas. Nesciunt dolorem ea dolorum."
    ],
    "created": "Fri, 25 Mar 2016 12:11:30 GMT",
    "id": 1,
    "imgSrc": "https://www.conceptlawfirm.xyz/static/images/1000/write.jpg",
    "practiceArea": "Family Law",
    "slug": "voluptatum-illum-deserunt-sequi",
    "summary": "Qui id unde reiciendis sapiente quo eveniet autem ipsum.",
    "thumbnailSrc": "https://www.conceptlawfirm.xyz/static/images/400/write.jpg",
    "title": "Voluptatum illum deserunt sequi.",
    "updated": "Fri, 25 Mar 2016 12:11:30 GMT",
    "views": 0
  };

  const content = {
    "body": [
      "Mollitia ullam aspernatur officiis reprehenderit. Nihil corrupti corrupti impedit dicta. Voluptatem soluta sequi illum aliquam culpa odio. Quod libero neque quia hic.",
      "Itaque officia cupiditate aliquid explicabo perferendis expedita sequi. Corrupti quaerat at placeat error. Doloremque neque iure ratione molestiae tenetur perspiciatis. Ex expedita eveniet tempora ex quod earum repudiandae.",
      "Eaque sequi sit natus officiis molestiae qui harum. Maiores harum tenetur earum minus. Eligendi nostrum ipsa aspernatur aspernatur ut neque.",
      "Nulla adipisci rem quis rem eum ipsum non. Animi consequatur veniam accusamus. Repellendus repellendus sequi dignissimos.",
      "Molestias quia ullam quas animi magnam. Eos minus incidunt reiciendis. Autem corporis pariatur exercitationem ad dolor quod.",
      "Deserunt blanditiis nisi fugit. Iusto amet voluptate corrupti optio alias. Aut rerum quia occaecati dolorum eligendi quis.",
      "Dolorum tempore aliquam laborum eum dolore. Unde repellat perspiciatis magnam ducimus doloribus. Consequuntur iusto itaque architecto exercitationem pariatur.",
      "Accusamus adipisci reprehenderit sequi. Nemo aliquid voluptatibus voluptate neque ratione. Sit rerum totam quam placeat ex repellendus quo. Nesciunt voluptas libero expedita voluptatibus at.",
      "Dicta harum doloremque minus at officiis quod. Corporis odit quos totam officiis ex. Ut nemo tenetur suscipit hic dignissimos odio incidunt dolores.",
      "Vitae repudiandae sit temporibus in. Dolore officiis deserunt deleniti. Hic sed pariatur tempore voluptate corporis incidunt voluptas.",
      "Enim atque inventore tempore unde quia laborum earum error. Dolorum magnam dolorem debitis asperiores soluta minima quibusdam. Reprehenderit consectetur nisi incidunt qui.",
      "Et magni quos natus omnis magnam veniam. Aspernatur necessitatibus expedita maxime eius accusantium labore sint. Unde similique pariatur consequuntur ex porro occaecati perspiciatis. Fugit a cum fugit facilis.",
      "Et eum veniam occaecati nostrum nesciunt. Aspernatur dolorem odio exercitationem sit. Saepe atque quisquam pariatur ea nesciunt voluptas. Harum fugiat eum mollitia sapiente facere.",
      "Aspernatur suscipit pariatur illum atque necessitatibus. Minus minima pariatur consequatur mollitia. Accusamus ipsa necessitatibus tempore sint. Itaque repellat numquam ad suscipit dolor fugit perspiciatis.",
      "Doloribus in sunt ipsam vitae numquam adipisci. Quae beatae recusandae occaecati voluptates tenetur. Molestias enim quam voluptatibus itaque illo nobis perspiciatis. Illo esse hic esse illo autem asperiores.",
      "Accusamus nobis quia occaecati ipsa minima odit libero impedit. Eos impedit maxime ab perspiciatis. Minus maxime odit corporis laudantium beatae natus ullam. Beatae eligendi cupiditate rerum dolores iste reiciendis animi.",
      "Nostrum fugiat beatae culpa sunt. Dolor accusamus sint autem alias. Sint quo eveniet magni magnam. Neque nulla exercitationem autem possimus suscipit corrupti. Tenetur praesentium dolore vero atque consectetur reiciendis.",
      "Eos sunt quae reiciendis labore quibusdam. Accusantium sequi reiciendis saepe assumenda doloribus nemo asperiores. Voluptate quaerat nisi culpa sint.",
      "Magni quaerat porro adipisci debitis consectetur distinctio. Expedita velit fugiat maxime. Corrupti repellendus quos in quos. Quaerat optio mollitia voluptatum qui eaque illo.",
      "Neque impedit quisquam voluptate at hic amet quas. Nesciunt dolorem ea dolorum."
    ],
    "practiceArea": "Mergers & Acquisitions",
    "slug": "voluptatum-illum-deserunt-sequi",
    "summary": "Qui id unde reiciendis sapiente quo eveniet autem ipsum.",
    "title": "Voluptatum illum deserunt sequi.",
  };

  const config = {
    headers: {
      'Authorization': `JWT randomtoken`
    }
  };

  describe('fetchPosts', () => {
    const normalized = normalizeResponseData(posts, postSchema);

    it('dispatches postsLoaded on successful load where admin=false', () => {
      const mock = new MockAdapter(axios);
      mock.onGet(`${API_URL}/api/posts`).reply(200, {
        posts
      })

      const store = mockStore({})

      return store.dispatch(fetchPosts())
        .then(() => {
          expect(store.getActions()[0]).toEqual(
            postsLoaded(
              normalized.entities, 
              normalized.result
            )
          );
        });
    });

    it('dispatches recordsLoaded on successful load where admin=true', () => {
      const mock = new MockAdapter(axios);
      mock.onGet(`${API_URL}/api/posts`).reply(200, {
        posts
      })      

      const store = mockStore({})

      return store.dispatch(fetchPosts(true))
        .then(() => {
          expect(store.getActions()[0]).toEqual(
            recordsLoaded(
              normalized.entities.posts,
              normalized.result
            )
          );
        });
    });
  });

  describe('fetchPost', () => {
    const normalized = normalizeResponseData(post, postSchema);

    it('dispatches postLoaded on successful load', () => {
      const mock = new MockAdapter(axios);
      mock.onGet(`${API_URL}/api/posts/1`).reply(200, {
        post
      })   

      const store = mockStore({})

      return store.dispatch(fetchPost("1"))
        .then(() => {
          expect(store.getActions()[0]).toEqual(
            postLoaded(
              normalized.entities.posts, 
              post.id
            )
          );
        });
    })
  })

  describe('addPost', () => {
    const normalized = normalizeResponseData(post, postSchema);

    it('dispatches recordAdded if successful', () => {
      const mock = new MockAdapter(axios);
      mock.onPost(`${API_URL}/api/posts`).reply(200, {
        post
      })   

      const store = mockStore({})

      return store.dispatch(addPost(config, content))
        .then(() => {
          expect(store.getActions()[0]).toEqual(
            recordAdded(
              normalized.entities, 
              normalized.entities.posts, 
              post.id
            )
          );
        });
    });
  });

  describe('editPost', () => {
    const normalized = normalizeResponseData(post, postSchema);

    it('dispatches recordEdited if successful', () => {
      const mock = new MockAdapter(axios);
      mock.onPut(`${API_URL}/api/posts/1`).reply(200, {
        post
      });

      const store = mockStore({})

      return store.dispatch(editPost(config, content, "1"))
        .then(() => {
          expect(store.getActions()[0]).toEqual(
            recordEdited(
              normalized.entities, 
              normalized.entities.posts, 
              post.id
            )
          );
        });
    });
  });

  describe('deletePost', () => {
    const normalized = normalizeResponseData(posts, postSchema);

    it('dispatches recordDeleted if successful', () => {
      const mock = new MockAdapter(axios);
      mock.onDelete(`${API_URL}/api/posts/3`).reply(200, {
        posts
      });

      const store = mockStore({})

      return store.dispatch(deletePost(config, "3"))
        .then(() => {
          expect(store.getActions()[0]).toEqual(
            recordDeleted(
              normalized.entities, 
              normalized.entities.posts, 
              normalized.result
            )
          );
        });
    });
  });

  describe('fetchRelatedPosts', () => {
    const normalized = normalizeResponseData(relatedPosts, postSchema);

    it('dispatches postsLoaded if successful', () => {
      const mock = new MockAdapter(axios);
      mock.onGet(`${API_URL}/api/posts`).reply(200, {
        posts
      });

      const store = mockStore({})

      return store.dispatch(fetchRelatedPosts("1", "Family Law"))
        .then(() => {
          expect(store.getActions()[0]).toEqual(
            postsLoaded(
              normalized.entities, 
              normalized.result
            )
          );
        });
    });
  });

  describe('postsLoaded', () => {
    const normalized = normalizeResponseData(posts, postSchema);

    it('should return correct type and payload', () => {
      const expectedResult = {
        type: POSTS_LOADED,
        entities: normalized.entities,
        postIds: normalized.result
      };

      expect(postsLoaded(
        normalized.entities, normalized.result)
      ).toEqual(expectedResult);
    });
  });

  describe('postLoaded', () => {
    const normalized = normalizeResponseData(post, postSchema);

    it('should return correct type and payload', () => {
      const expectedResult = {
        type: POST_LOADED,
        post: normalized.entities.posts,
        postId: post.id
      };

      expect(postLoaded(
        normalized.entities.posts, post.id)
      ).toEqual(expectedResult);
    });
  });
});