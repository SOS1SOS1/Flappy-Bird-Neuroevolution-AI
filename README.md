# Flappy-Bird-Neuroevolution-AI

Neuroevolution is a form of AI that implements Darwin's theory of natural selction. The process involves the three below steps with steps 2 and 3 being performed repeatedly.

STEP 1 - The Population
  # Creates an empty population
  # Fills it with DNA encoded objects (picks random values to start)
  
STEP 2 - Selection
  # Creates an empty mating pool
  # Evaluates the fitness of each member of the population based on some
    criteria using a function (calcFitness)
  # Adds each member to mating pool in a manner consistent to the fitness,
    the more fit it is the more times it appears in the mating pool

STEP 3 - Reproduction
  # Create a new empty population
  # Fill the new population by
     1. Pick two "parents" from the mating pool
     2. Crossover -- create a "child" object by mating the two parents
     3. Mutation -- mutate the child's DNA based on a given probabilty
     4. Add the child object to the new population
  # Replace the old population with the new one
