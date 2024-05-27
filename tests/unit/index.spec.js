import { shallowMount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'
import { useRouter } from 'vue-router'

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
}))

describe('IndexPage.vue', () => {
  let routerMock

  beforeEach(() => {
    routerMock = {
      push: jest.fn()
    }

    useRouter.mockReturnValue(routerMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component', () => {
    const wrapper = shallowMount(IndexPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('contains the title "Vertex"', () => {
    const wrapper = shallowMount(IndexPage)
    expect(wrapper.find('.welcome-title').text()).toBe('Vertex')
  })

  it('contains the subtitle', () => {
    const wrapper = shallowMount(IndexPage)
    expect(wrapper.find('.welcome-subtitle').text()).toBe('Empowering our clients with innovative technology solutions tailored to their needs.')
  })

  it('navigates to Clients page when "View Clients" button is clicked', async () => {
    const wrapper = shallowMount(IndexPage)
    const button = wrapper.find('.learn-more-button')

    await button.trigger('click')

    expect(routerMock.push).toHaveBeenCalledWith('/clients')
  })
})
