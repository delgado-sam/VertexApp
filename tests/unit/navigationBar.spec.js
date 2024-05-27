import { shallowMount } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar.vue'
import { useRouter, useRoute } from 'vue-router'

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  useRoute: jest.fn(),
}))

describe('NavigationBar.vue', () => {
  let routerMock, routeMock

  beforeEach(() => {
    routerMock = {
      push: jest.fn()
    }
    routeMock = {
      path: '/'
    }

    useRouter.mockReturnValue(routerMock)
    useRoute.mockReturnValue(routeMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component', () => {
    const wrapper = shallowMount(NavigationBar)
    expect(wrapper.exists()).toBe(true)
  })

  it('has a button with text "About Us"', () => {
    const wrapper = shallowMount(NavigationBar)
    expect(wrapper.text()).toContain('About Us')
  })

  it('navigates to Clients page when Clients button is clicked', async () => {
    const wrapper = shallowMount(NavigationBar)
    const clientsButton = wrapper.findAll('.button-client').at(1)

    await clientsButton.trigger('click')

    expect(routerMock.push).toHaveBeenCalledWith('/clients')
  })
  it('navigates to About Us page when About Us button is clicked', async () => {
    const wrapper = shallowMount(NavigationBar)
    const AboutUsButton = wrapper.findAll('.button-client').at(0)

    await AboutUsButton.trigger('click')

    expect(routerMock.push).toHaveBeenCalledWith('/about')
  })
})
