import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-8">
          Some of the best restaurants in your city are
          dying quietly.
        </h1>

        <div className="space-y-6 text-warm-gray text-base sm:text-lg leading-relaxed">
          <p>
            Right now, somewhere in Brooklyn or Queens, a woman is standing
            behind a stove she&apos;s stood behind for 25 years, cooking food
            her mother taught her to make, wondering if she can afford to
            keep the lights on next month.
          </p>

          <p>
            Her food is incredible. Her regulars love her. But the block
            changed, the rent went up, and the people who walk past her
            door every day have no idea she exists. There&apos;s no Eater
            write-up. No influencer post. No algorithm pushing her to the
            top of anyone&apos;s feed. She has a handwritten menu, a
            decades-old recipe, and empty tables.
          </p>

          <p className="text-charcoal font-medium text-lg sm:text-xl">
            Lazy Susan exists because we think that&apos;s wrong.
          </p>

          <p>
            We&apos;re not here to catalog every restaurant in the city.
            We&apos;re here specifically for the ones that are struggling.
            The family-owned spots where the food is real but the foot
            traffic isn&apos;t. The places that have been feeding their
            neighborhoods for years — sometimes decades — and are now
            watching those neighborhoods change around them.
          </p>

          <p>
            The Dominican kitchen where the owner is thinking about closing
            at the end of the year. The Korean grandmother who charges $11
            for a meal because she thinks that&apos;s what a meal should
            cost, even as her rent doubles. The roti shop that lost its
            signage in a storm two years ago and can&apos;t afford to
            replace it. These are real situations. These are the
            restaurants we&apos;re trying to save.
          </p>

          <p className="text-charcoal font-medium text-lg sm:text-xl">
            This isn&apos;t Yelp. This isn&apos;t a review site. This is
            a lifeline.
          </p>

          <p>
            Every restaurant on Lazy Susan was submitted by a real person —
            a neighbor, a regular, someone who loves the place and doesn&apos;t
            want to see it disappear. We don&apos;t do star ratings. We
            don&apos;t rank restaurants against each other. We tell their
            stories and ask you to show up.
          </p>

          <p>
            The name comes from the thing that sits in the middle of the
            table and spins food around so everyone can share. That&apos;s
            what we&apos;re doing — taking these restaurants that only a few
            people know about and spinning them out to everyone. Because the
            only thing standing between these places and survival is
            visibility.
          </p>

          <p className="text-charcoal font-medium text-lg sm:text-xl">
            The most powerful thing you can do is walk through the door.
          </p>

          <p>
            Not order delivery. Not leave a review. Just go. Sit down. Eat
            the food. Look the owner in the eye and tell them it was good.
            Bring a friend next time. That&apos;s it. That&apos;s how these
            places survive. One meal, one customer, one visit at a time.
          </p>
        </div>

        {/* How to Help */}
        <div className="mt-12 bg-cream-dark rounded-2xl p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">
            How you can help right now
          </h2>
          <div className="space-y-4 text-warm-gray">
            <div className="flex gap-3">
              <span className="text-terracotta font-serif text-xl font-bold mt-0.5">1.</span>
              <p>
                <strong className="text-charcoal">Submit a restaurant that&apos;s struggling.</strong>{' '}
                If you know a family-owned spot with empty tables that
                deserves to be packed, put it on Lazy Susan. It takes two
                minutes and it might be the thing that keeps them open.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-terracotta font-serif text-xl font-bold mt-0.5">2.</span>
              <p>
                <strong className="text-charcoal">Go eat somewhere new.</strong>{' '}
                Browse the listings. Find a place you&apos;ve never been.
                Walk in, order something, and stay for a while. Bring
                someone with you.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-terracotta font-serif text-xl font-bold mt-0.5">3.</span>
              <p>
                <strong className="text-charcoal">Tell people about this.</strong>{' '}
                Share a listing. Text a friend. Post about a restaurant you
                visited. Every person who walks through that door is one more
                reason the owner keeps going.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/submit"
            className="bg-terracotta text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-terracotta-dark transition-colors inline-block"
          >
            Submit a Restaurant
          </Link>
        </div>
      </div>
    </div>
  );
}
